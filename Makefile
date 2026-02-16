SHELL := /bin/bash

BACKEND_DIR  := backend
FRONTEND_DIR := frontend

BACKEND_LOG  := backend.log
FRONTEND_LOG := frontend.log

PAYARA_VERSION := 6.2025.11
PAYARA_JAR     := $(HOME)/.m2/repository/fish/payara/extras/payara-micro/$(PAYARA_VERSION)/payara-micro-$(PAYARA_VERSION).jar
BACKEND_WAR    := $(BACKEND_DIR)/target/customerserver.war

.PHONY: start stop restart \
        build-backend start-backend stop-backend restart-backend \
        start-frontend stop-frontend restart-frontend \
        status help

help: ## Show available targets
	@echo "Usage: make <target>"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

start: start-backend start-frontend ## Start backend + frontend

stop: stop-frontend stop-backend ## Stop both (graceful)

restart: stop start ## Restart both

# --- Backend (Payara Micro 6) ------------------------------------------------

build-backend: ## Build backend WAR (mvn package)
	@echo "Building backend..."; \
	cd $(BACKEND_DIR) && mvn -q package -DskipTests; \
	echo "  Built: $(BACKEND_WAR)"

start-backend: ## Start Payara Micro backend
	@if ss -tlnp 2>/dev/null | grep -q ':8080 '; then \
		echo "Backend already running on port 8080"; \
		exit 0; \
	fi; \
	if [ ! -f $(BACKEND_WAR) ]; then \
		echo "WAR not found, building..."; \
		cd $(BACKEND_DIR) && mvn -q package -DskipTests; \
	fi; \
	if [ ! -f $(PAYARA_JAR) ]; then \
		echo "Payara Micro JAR not found, downloading..."; \
		cd $(BACKEND_DIR) && mvn -q dependency:resolve; \
	fi; \
	echo "Starting backend (Payara Micro 6)..."; \
	setsid java -jar $(PAYARA_JAR) \
		--deploy $(BACKEND_WAR) \
		--nocluster \
		--contextroot customerserver \
		> $(BACKEND_LOG) 2>&1 & \
	printf "  Waiting for Payara Micro "; \
	for i in $$(seq 1 60); do \
		if grep -q "ready in" $(BACKEND_LOG) 2>/dev/null; then \
			echo ""; \
			echo "  Backend ready: http://localhost:8080/customerserver/api/"; \
			exit 0; \
		fi; \
		if ! pgrep -f '[p]ayara-micro.*jar' >/dev/null 2>&1; then \
			echo ""; \
			echo "  ERROR: Backend process died. Check $(BACKEND_LOG)"; \
			exit 1; \
		fi; \
		printf "."; \
		sleep 1; \
	done; \
	echo ""; \
	echo "  TIMEOUT after 60s. Check $(BACKEND_LOG)"; exit 1

stop-backend: ## Stop Payara Micro gracefully
	@if ! pgrep -f '[p]ayara-micro.*jar' >/dev/null 2>&1; then \
		echo "Backend is not running."; \
		exit 0; \
	fi; \
	echo "Stopping backend..."; \
	pkill -TERM -f '[p]ayara-micro.*jar' 2>/dev/null || true; \
	echo "  Waiting for process to exit..."; \
	for i in $$(seq 1 15); do \
		if ! pgrep -f '[p]ayara-micro.*jar' >/dev/null 2>&1; then \
			echo "  Backend stopped."; \
			exit 0; \
		fi; \
		sleep 1; \
	done; \
	echo "  Still running after 15s, sending SIGKILL..."; \
	pkill -KILL -f '[p]ayara-micro.*jar' 2>/dev/null || true; \
	sleep 1; \
	echo "  Backend killed."

restart-backend: stop-backend start-backend ## Restart backend

rebuild-backend: build-backend restart-backend ## Rebuild + restart backend

# --- Frontend (Angular 19) --------------------------------------------------

start-frontend: ## Start Angular dev server
	@if ss -tlnp 2>/dev/null | grep -q ':4200 '; then \
		echo "Frontend already running on port 4200"; \
		exit 0; \
	fi; \
	echo "Starting frontend (Angular 19)..."; \
	setsid sh -c 'cd $(FRONTEND_DIR) && exec npx ng serve' > $(FRONTEND_LOG) 2>&1 & \
	printf "  Waiting for Angular "; \
	for i in $$(seq 1 60); do \
		if grep -q "Local:" $(FRONTEND_LOG) 2>/dev/null; then \
			echo ""; \
			echo "  Frontend ready: http://localhost:4200/"; \
			exit 0; \
		fi; \
		if ! pgrep -f '[n]g serve' >/dev/null 2>&1; then \
			echo ""; \
			echo "  ERROR: Frontend process died. Check $(FRONTEND_LOG)"; \
			exit 1; \
		fi; \
		printf "."; \
		sleep 1; \
	done; \
	echo ""; \
	echo "  TIMEOUT after 60s. Check $(FRONTEND_LOG)"; exit 1

stop-frontend: ## Stop Angular dev server gracefully
	@if ! pgrep -f '[n]g serve' >/dev/null 2>&1; then \
		echo "Frontend is not running."; \
		exit 0; \
	fi; \
	echo "Stopping frontend..."; \
	pkill -TERM -f '[n]g serve' 2>/dev/null || true; \
	echo "  Waiting for process to exit..."; \
	for i in $$(seq 1 15); do \
		if ! pgrep -f '[n]g serve' >/dev/null 2>&1; then \
			echo "  Frontend stopped."; \
			exit 0; \
		fi; \
		sleep 1; \
	done; \
	echo "  Still running after 15s, sending SIGKILL..."; \
	pkill -KILL -f '[n]g serve' 2>/dev/null || true; \
	sleep 1; \
	echo "  Frontend killed."

restart-frontend: stop-frontend start-frontend ## Restart frontend

# --- Status ------------------------------------------------------------------

status: ## Show running status
	@echo "=== Backend ==="
	@if pgrep -f '[p]ayara-micro.*jar' >/dev/null 2>&1; then \
		echo "  Running (PID $$(pgrep -f '[p]ayara-micro.*jar' | head -1))"; \
	else \
		echo "  Stopped"; \
	fi
	@echo "=== Frontend ==="
	@if pgrep -f '[n]g serve' >/dev/null 2>&1; then \
		echo "  Running (PID $$(pgrep -f '[n]g serve' | head -1))"; \
	else \
		echo "  Stopped"; \
	fi
