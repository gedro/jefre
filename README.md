# JEFREE - Jobs Easy and Free
#### Find employees/jobs easy and free

---

## Dev features
- [x] Microfrontend architecture
  - [x] Webpack module federation
  - [x] React framework
  - [x] Vue framework
  - [x] Independent deployment per module
- [x] Git flow (CI/CD)
- [x] AWS Deployment
- [x] Authentication
  - [x] JWT token
  - [x] OAuth2 - Google + GitHub
  - [ ] Multifactor authentication
  - [x] Audit log
- [x] CORS + CSRF
- [x] User management
- [x] Role based access control
- [x] Gmail API (Instead of Java Mailer to enable the use of Google Workspace company email group as sender)
- [ ] Spring Authentication Server
- [ ] Spring Resource Server
- [ ] Spring AI

# Environments

### Backend
- libs
  - authentication
  - database
  - mailer
  - wsclient
- services
  - JEFREE core: http://localhost:8080

### Microfrontends

- JEFREE Container: http://localhost:9080
- Header: http://localhost:9081
- Footer: http://localhost:9082
- Services
  - AuthN/AuthZ: http://localhost:9083
  - Backend API: http://localhost:9084
- Home: http://localhost:9085
- About: http://localhost:9086
- Contact: http://localhost:9087
- Terms of Service: http://localhost:9088
- Privacy Policy: http://localhost:9089
- Authentication Page: http://localhost:9090
- User Profile: http://localhost:9091
- Admin: http://localhost:9092
- Candidate: http://localhost:9093
- Recruiter: http://localhost:9094
- Dashboard: http://localhost:9099