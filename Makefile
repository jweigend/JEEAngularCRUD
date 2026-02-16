SHELL := /bin/bash

BACKEND_DIR  := backend
FRONTEND_DIR := frontend
WILDFLY_CLI  := $(BACKEND_DIR)/target/server/bin/jboss-cli.sh

BACKEND_LOG  := backend.log
FRONTEND_LOG := frontend.log

.PHONY: start stop restart \
        start-backend stop-backend restart-backend \
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

# --- Backend (WildFly 34) ---------------------------------------------------

start-backend: ## Start WildFly backend
	@if ss -tlnp 2>/dev/null | grep -q ':8080 '; then \
		echo "Backend already running on port 8080"; \
		exit 0; \
	fi; \
	echo "Starting backend (WildFly 34)..."; \
	setsid sh -c 'cd $(BACKEND_DIR) && exec mvn wildfly:dev' > $(BACKEND_LOG) 2>&1 & \
	printf "  Waiting for WildFly "; \
	for i in $$(seq 1 90); do \
		if grep -q "started in" $(BACKEND_LOG) 2>/dev/null; then \
			echo ""; \
			echo "  Backend ready: http://localhost:8080/customerserver/api/"; \
			exit 0; \
		fi; \
		if ! pgrep -f '[w]ildfly:dev' >/dev/null 2>&1; then \
			echo ""; \
			echo "  ERROR: Backend process died. Check $(BACKEND_LOG)"; \
			exit 1; \
		fi; \
		printf "."; \
		sleep 2; \
	done; \
	echo ""; \
	echo "  TIMEOUT after 3 min. Check $(BACKEND_LOG)"; exit 1

stop-backend: ## Stop WildFly gracefully
	@if ! pgrep -f '[w]ildfly:dev' >/dev/null 2>&1; then \
		echo "Backend is not running."; \
		exit 0; \
	fi; \
	echo "Stopping backend..."; \
	if [ -x $(WILDFLY_CLI) ]; then \
		echo "  Sending shutdown via WildFly CLI..."; \
		$(WILDFLY_CLI) --connect command=:shutdown 2>/dev/null || true; \
	else \
		echo "  WildFly CLI not found, sending SIGTERM..."; \
		pkill -TERM -f '[w]ildfly:dev' 2>/dev/null || true; \
	fi; \
	echo "  Waiting for process to exit..."; \
	for i in $$(seq 1 30); do \
		if ! pgrep -f '[w]ildfly:dev' >/dev/null 2>&1; then \
			echo "  Backend stopped gracefully."; \
			exit 0; \
		fi; \
		sleep 1; \
	done; \
	echo "  Still running after 30s, sending SIGTERM..."; \
	pkill -TERM -f '[w]ildfly:dev' 2>/dev/null || true; \
	for i in $$(seq 1 10); do \
		if ! pgrep -f '[w]ildfly:dev' >/dev/null 2>&1; then \
			echo "  Backend stopped."; \
			exit 0; \
		fi; \
		sleep 1; \
	done; \
	echo "  Still running after 40s, sending SIGKILL (last resort)..."; \
	pkill -KILL -f '[w]ildfly:dev' 2>/dev/null || true; \
	pkill -KILL -f '[j]boss.*standalone' 2>/dev/null || true; \
	sleep 1; \
	echo "  Backend killed."

restart-backend: stop-backend start-backend ## Restart backend

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
	@if pgrep -f '[w]ildfly:dev' >/dev/null 2>&1; then \
		echo "  Running (PID $$(pgrep -f '[w]ildfly:dev'))"; \
	else \
		echo "  Stopped"; \
	fi
	@echo "=== Frontend ==="
	@if pgrep -f '[n]g serve' >/dev/null 2>&1; then \
		echo "  Running (PID $$(pgrep -f '[n]g serve' | head -1))"; \
	else \
		echo "  Stopped"; \
	fi
