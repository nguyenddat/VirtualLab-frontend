# Role-Based Authentication System

This authentication system supports three user roles: **student**, **teacher**, and **admin** with different access levels and redirects.

## User Roles

### Student
- **Redirect**: `/explore`
- **Access**: Browse learning materials and simulations
- **Test Account**: `student1` (any password)

### Teacher
- **Redirect**: `/explore`
- **Access**: Browse materials and manage classes
- **Test Account**: `teacher1` (any password)

### Admin
- **Redirect**: `/dashboard`
- **Access**: Full access to all features including dashboard
- **Test Account**: `admin1` (any password)

## Features

### Role-Based Redirects
- Students and teachers are redirected to `/explore` after login
- Admins are redirected to `/dashboard` after login
- Role is determined by username pattern or explicit selection during registration

### Role-Based Access Control
- `RoleGuard` component for protecting routes
- `AdminGuard`, `TeacherGuard`, `StudentGuard` convenience components
- Role hierarchy: student (1) < teacher (2) < admin (3)

### Authentication Context
The `useAuthContext` hook provides:
- User information and authentication state
- Role-based utility functions
- Login/register/logout functionality

## Usage

### Login
```tsx
import { LoginForm } from '@/features/auth';

// Use test accounts: student1, teacher1, admin1
<LoginForm />
```

### Register
```tsx
import { RegisterForm } from '@/features/auth';

// Includes role selection dropdown
<RegisterForm />
```

### Route Protection
```tsx
import { AdminGuard, RoleGuard } from '@/features/auth';

// Protect admin-only routes
<AdminGuard>
  <AdminDashboard />
</AdminGuard>

// Protect with custom role requirement
<RoleGuard requiredRole="teacher">
  <TeacherPanel />
</RoleGuard>
```

### Role Checking
```tsx
import { useAuthContext } from '@/features/auth';

const { hasRole, canAccessDashboard, userRole } = useAuthContext();

// Check if user has admin role
if (hasRole('admin')) {
  // Show admin features
}

// Check dashboard access
if (canAccessDashboard()) {
  // Show dashboard link
}
```

## Implementation Details

### Role Detection
- Login: Role is determined by username pattern
- Register: Role is explicitly selected during registration
- Username patterns: `student*`, `teacher*`, `admin*`

### Storage
- User data and role are stored in localStorage
- Session tokens are managed automatically
- Role persists across browser sessions

### Security
- Role-based route protection at component level
- Automatic redirects for unauthorized access
- Role hierarchy enforcement
