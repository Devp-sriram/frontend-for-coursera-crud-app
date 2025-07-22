
# 🛠️ EMMA - 21-Day Development Sprint Plan

## 🎯 Project Goal
Develop a comprehensive SaaS application named **"EMMA"** (Employee Management & Monitoring App) to help companies manage and monitor employees.

---

## 📦 Current State
- **Tech Stack:** Next.js, Tailwind CSS, Shadcn UI, MongoDB
- **Features:** Basic CRUD for employees
- **Missing:** JWT auth, RBAC, login tracking, task management, AI bot, dashboards

---

## 🚀 Sprint Overview

### Week 1: Authentication, RBAC & Login Tracking
**Day 1-2: JWT Auth**
- Add JWT-based login/logout
- Secure API routes
- Store JWT in cookies

**Day 3-4: Role-Based Access Control**
- Add roles: Admin, Manager, Employee
- Create role-checking middleware
- Role-based dashboard access

**Day 5-6: Login Time Tracking**
- Create `LoginSession` model
- Track login/logout sessions
- Add admin login reports

**Day 7: Testing & Buffer**
- Unit test auth, RBAC, session logs

---

### Week 2: Task Management & AI Chatbot

**Day 8-9: Task Backend**
- `Task` model: title, dueDate, status, etc.
- API: create, update, list per user

**Day 10-11: Task Frontend**
- Manager: assign, update
- Employee: view, mark status

**Day 12-13: AI Chatbot (Part 1)**
- Integrate OpenAI Chat API
- Create chatbot UI
- Schema for function calling

**Day 14: Testing & Review**
- Validate task and chatbot basics

---

### Week 3: Dashboards & Analytics

**Day 15-16: Productivity Dashboard**
- Define productivity score formula
- Create metrics API
- Charts for task stats

**Day 17-18: In-App Timing Analytics**
- Track page visits via router
- Record and visualize time spent

**Day 19: AI Chatbot (Part 2)**
- Implement function execution from bot
- Examples: assign task, get score

**Day 20: QA & Polish**
- Fix bugs, polish UI/UX

**Day 21: Deploy & Docs**
- Deploy to Vercel
- Update README and user guide

---

## 📌 Notes

**RBAC Middleware Example:**
```ts
export function authorizeRole(roles: string[]) {
  return function (req, res, next) {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
```

**Productivity Score Formula:**
```
score = (tasks_completed / tasks_assigned) * 0.6 +
        (avg_target / avg_actual_completion_time) * 0.4
```

**AI Function Call Example:**
```json
{
  "name": "assignTask",
  "parameters": {
    "employeeId": "12345",
    "title": "Design Landing Page",
    "dueDate": "2025-07-20"
  }
}
```
