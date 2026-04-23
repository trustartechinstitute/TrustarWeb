# Security Specification for Trustar Institute

## 1. Data Invariants
- A **Student** profile cannot exist without a valid **Parent ID** if they are a child student.
- A **Cohort** must always be linked to a valid **Course**.
- **Lessons** are immutable content that only admins can change.
- **Enrollments** are the single source of truth for student access. A student cannot view a lesson unless they have an active enrollment in a cohort running that course, and the cohort pacing allows it.
- **Lead** data is PII and must only be visible to Admins.
- **Coin Balances** can only be modified by Admins (top-up) or through a verified logic flow (spending).

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)

1. **Identity Spoofing:** A student attempts to update their own `points` or `coinBalance` in their user document.
2. **Privilege Escalation:** A student attempts to set their `role` to `admin` during profile update.
3. **Ghost Lead injection:** An unauthenticated user attempts to write 100 fake leads per second to the `leads` collection.
4. **PII Leak:** An authenticated student attempts to perform a `list` query on the `users` collection to find emails of other students.
5. **Future Racing:** A student in Cohort Week 2 attempts to fetch a Lesson document from Week 10.
6. **Orphaned Enrollment:** A student attempts to create an enrollment record for themselves in a high-ticket cohort without admin approval.
7. **Bypassing Price:** A student attempts to "Access" a premium resource directly via its URL/metadata without spending coins.
8. **ID Poisoning:** An attacker attempts to create a document with a 1MB junk string as the document ID.
9. **Relational Break:** A user creates a Cohort record pointing to a non-existent Course ID.
10. **State Shortcutting:** A parent attempts to set a child's assignment status to "Completed" manually in the database.
11. **Resource Exhaustion:** A user attempts to upload an array of 5,000 tags to a resource document.
12. **Unauthorized PII Access:** A parent attempts to read the private profile of a student who is not their child.

## 3. The Test Runner (firestore.rules.test.ts)
*(I will implement this sequentially if requested, but first I will draft the rules to block these)*
