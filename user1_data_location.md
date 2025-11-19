# 🔍 USER 1 DATA STORAGE LOCATIONS

## **HIGHLIGHTED: Where User 1 Data is Stored**

### ✅ **PRIMARY USER DATA** (FOUND)
```
📍 TABLE: authentication_user
🔑 PRIMARY KEY: id = 1
📊 DATA:
   - Username: KUNAL
   - Email: alien@gmail.com  
   - Role: student
   - Date Joined: 2025-11-19 15:32:46
   - Password: [hashed]
   - Is Active: True
```

### ✅ **USER PROFILE DATA** (FOUND)
```
📍 TABLE: authentication_userprofile  
🔑 PRIMARY KEY: id = 1
🔗 FOREIGN KEY: user_id = 1 → links to authentication_user(id=1)
📊 DATA:
   - Created At: 2025-11-19 15:32:46
   - Updated At: 2025-11-19 15:32:46
```

### ❌ **WELLNESS DATA** (EMPTY - No data yet)
```
📍 TABLE: wellness_dailymoodlog
🔗 FOREIGN KEY: user_id = 1 (would link to User 1)
📊 STATUS: No mood logs recorded yet

📍 TABLE: wellness_studysession  
🔗 FOREIGN KEY: user_id = 1 (would link to User 1)
📊 STATUS: No study sessions recorded yet

📍 TABLE: wellness_burnoutassessment
🔗 FOREIGN KEY: user_id = 1 (would link to User 1) 
📊 STATUS: No burnout assessments yet
```

## **DATABASE RELATIONSHIP DIAGRAM**

```
authentication_user (id=1)
├── Username: KUNAL
├── Email: alien@gmail.com
├── Role: student
└── Connected to:
    ├── authentication_userprofile (user_id=1) ✅ EXISTS
    ├── wellness_dailymoodlog (user_id=1) ❌ EMPTY
    ├── wellness_studysession (user_id=1) ❌ EMPTY
    └── wellness_burnoutassessment (user_id=1) ❌ EMPTY
```

## **HOW TO ACCESS USER 1 DATA**

### Via Django ORM:
```python
# Get User 1
user = User.objects.get(id=1)
print(f"User: {user.username}")

# Get User 1's profile
profile = UserProfile.objects.get(user_id=1)
print(f"Profile created: {profile.created_at}")

# Get User 1's mood logs (will be empty)
mood_logs = DailyMoodLog.objects.filter(user_id=1)
print(f"Mood logs count: {mood_logs.count()}")
```

### Via SQL:
```sql
-- Get User 1 basic info
SELECT * FROM authentication_user WHERE id = 1;

-- Get User 1 profile
SELECT * FROM authentication_userprofile WHERE user_id = 1;

-- Get User 1 wellness data
SELECT * FROM wellness_dailymoodlog WHERE user_id = 1;
SELECT * FROM wellness_studysession WHERE user_id = 1;
```

## **KEY FINDINGS**
- ✅ User 1 (KUNAL) exists in the database
- ✅ Basic authentication data is stored
- ✅ User profile is created
- ❌ No wellness tracking data yet (user hasn't used the app features)
- 🔗 All tables are properly linked via foreign keys to user_id = 1