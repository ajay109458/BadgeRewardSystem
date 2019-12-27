# Badge Reward System

```
npm run start-dev
```

### Attendance 
* Get attendance 
```
GET - http://localhost:3000/api/attendance/user1
```

* Add attendance 
```
POST - http://localhost:3000/api/attendance/user1
```

### Badge Rule

* Get badge Rule
```
GET - http://localhost:3000/api/badgerule
```
* Add badge Rule
```
POST - http://localhost:3000/api/badgerule

{
  "source": "AM",
  "ruleType": "lastXdays",
  "operator": ">=",
  "targetValue": "5",
  "badgeId": "<Check Badge Id>"
}
```

### Badge
* Get Badges
```
GET - http://localhost:3000/api/badge
```

* Get Badge For A user
```
GET - http://localhost:3000/api/badge/user1
```

* Add Badge
```
POST - http://localhost:3000/api/badge/badgeName
```
