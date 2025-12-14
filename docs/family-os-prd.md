# Family OS Product Requirements Document (PRD)

## Product Name (Working)

**Family OS** (working title)

## Problem Statement

Modern families manage a complex mix of routine responsibilities, one-off priorities, childcare logistics, household admin, and long-term planning — often fragmented across notes, calendars, chats, and memory. This creates mental load, duplication, missed tasks, and friction between partners.

There is a need for a **single, calm, intuitive system** that acts as the *source of truth* for family operations — lightweight enough to use daily, but powerful enough to handle routines, priorities, and planning.

## Product Vision

Create a **central family management system** that feels as simple and reassuring as Apple Health:

* Calm, non-overwhelming
* Clear visual summaries
* Effortless task capture
* Shared understanding between partners

The app should reduce cognitive load, not add to it.

## Target Users

### Primary Users

* Two parents / partners (e.g. you and your wife)

### Secondary Users (Future)

* Children (view-only or limited interaction)
* Extended family / carers (temporary or scoped access)

## Core Jobs To Be Done

* *“I need to know what needs doing today without thinking.”*
* *“We need clarity on who owns what.”*
* *“I want routines handled automatically.”*
* *“I want one place for family life.”*

---

## Core Features

### 1. Authentication & Profiles

**Must Have**

* Google Login (OAuth)
* Family Group creation
* Individual profiles within a family
* Simple first-run flow to create a family, invite a partner, and set colours/avatars

**Core Flows**

1. New user signs in with Google → asked to create or join a family.
2. Creator names the family, picks a colour, and invites partner via link/email.
3. Each member sets role, avatar, and default visibility (private vs family-visible).
4. If no partner joins, the experience still works for solo use.

**Permissions & Visibility (V1)**

* Parents: full create/edit/delete across tasks, routines, and events.
* Carers: can complete tasks and view schedules; cannot edit family settings.
* Children: view-only by default; may be assigned tasks but cannot edit metadata.
* Guests (future): time-boxed access for carers/extended family.

**Profile Attributes**

* Name
* Role (Parent, Child, Carer)
* Default visibility & permissions
* Colour/avatar

---

### 2. Task Types

#### A. Routine Tasks (Recurring)

Used for everyday life.

Examples:

* Dishes
* Laundry
* Bedtime routine
* Bin night

Attributes:

* Frequency (daily, weekly, fortnightly, monthly)
* Assigned owner (or rotating)
* Auto-reset on completion
* Optional time window
* Completion rule: resets at midnight for daily routines; for weekly/fortnightly/monthly, resets at the start of the next cycle.
* Rotation rule: round-robin between selected owners with override option for manual reassignment.

#### B. One-Off Tasks

Used for ad-hoc or priority items.

Examples:

* Book immunisation
* Fix fence
* Buy birthday gift

Attributes:

* Due date (optional)
* Priority level
* Notes / checklist
* Attachments (future)
* Statuses: open, in-progress, completed, skipped
* Reminders: optional due-date reminder plus one configurable nudge (e.g., 24 hours before)

#### C. Scheduled Events

Tasks tied to dates/times.

Examples:

* Childcare drop-off
* Appointment
* School event

Attributes:

* Date & time
* Location
* Linked tasks

---

### 3. Views & Navigation (Apple Health Inspired)

#### Home (Summary View)

*Primary screen*

* Today’s tasks
* Upcoming routines
* Overdue items
* Gentle progress indicators (not gamified)

Design principles:

* Card-based layout
* Plenty of white space
* Minimal colour usage

#### Tasks View

* Filter by: Today / This Week / All
* Filter by owner
* Filter by type

#### Routines View

* Visual list of routines
* Clear frequency indicators
* Toggle on/off

#### Calendar View

* Weekly / Monthly
* Tasks + events combined

---

### 4. Ownership & Accountability

* Every task has a clear owner
* Optional shared ownership
* Visual indicator for “yours vs mine vs ours”

No nagging, no streak pressure.

---

### 5. Scheduling Logic

* Tasks can exist *without* a date
* Smart surfacing of overdue items
* Routine tasks auto-regenerate

---

### 6. Notifications (Minimalist)

Principles:

* No spam
* Opt-in reminders

Examples:

* Morning summary
* Due today reminder
* Routine not completed

---

### 7. Family-Wide Planning (Phase 2)

* Weekly planning mode
* Monthly priorities
* Shared goals (e.g. holidays, projects)

---

## UX / UI Principles

Inspired by **Apple Health**:

* Soft gradients
* Rounded cards
* Subtle dividers
* No hard borders
* Calm typography

### Colour Scheme (Primary Palette)

* **Stormy Teal** – #006d77 (Primary actions, headers)
* **Pearl Aqua** – #83c5be (Secondary accents)
* **Alice Blue** – #edf6f9 (Background)
* **Almond Silk** – #ffddd2 (Highlights / warnings)
* **Tangerine Dream** – #e29578 (Priority / alerts)

Usage rules:

* 80% neutral (Alice Blue)
* Colour only to guide attention

---

## Data Model (High Level)

### User

* id
* name
* email
* role

### Family

* id
* name
* members[]

### Task

* id
* title
* type (routine | one-off | scheduled)
* ownerId
* frequency
* dueDate
* status
* notes

---

## MVP Scope & Release Criteria

**Included in V1**

* Google sign-in, family creation, and two-member households working end-to-end.
* CRUD for routines, one-off tasks, and scheduled events with ownership and optional reminders.
* Home view summarising today, overdue, and upcoming within 7 days.
* Task filters by owner and type; routines list with frequency badges; combined calendar view.
* Notifications: daily morning summary (optional) and due-today reminder for assigned items.
* Mobile-first responsive layout reflecting Apple Health-inspired visual language.

**Release Exit Criteria**

* A new user can onboard, invite a partner, and both can view/share the same task list.
* Completing a routine reappears on the next cycle without manual re-creation.
* Overdue logic: items past due surface prominently on Home until completed/cleared.
* No blocking accessibility issues for keyboard and screen-reader basics on primary flows.
* P50 page load (warm) under 2s on modern mobile; task interactions under 200ms perceived latency.

**Deferred (Post-V1)**

* Offline mode and conflict resolution.
* File attachments and integrations (calendar/email).
* Advanced planning modes (weekly/monthly planning) beyond basic notes.
* Smart suggestions/automation.

## Risks & Open Questions

* How should rotating routines behave when a member is on holiday? (Pause vs skip vs reassign.)
* Minimum viable permissions for children—should completion be allowed with confirmation?
* Notification sensitivity: how to avoid “spam” while keeping accountability—need opt-in defaults validated with users.
* Data residency/compliance expectations for family data (regions, retention, deletion policies).
* Calendar interoperability (ICS export/import) appetite and privacy implications.

---

## Non-Functional Requirements

* Responsive (mobile-first)
* Fast load times
* Offline-tolerant (future)
* Secure auth
* Private by default

---

## Out of Scope (V1)

* Gamification
* Points or streaks
* Social sharing
* AI automation (future phase)

---

## Success Metrics

* Daily active usage by both parents
* Reduced missed tasks
* Subjective feeling of “mental relief”

---

## Future Enhancements

* AI suggestions (routine optimisation)
* Integration with calendars
* Voice capture
* Child checklists
* Household inventory

---

## Guiding Principle

> *If it creates friction, remove it.*

This app should feel like a **quiet assistant**, not another system to manage.
