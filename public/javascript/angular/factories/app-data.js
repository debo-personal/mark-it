(function(app, undefined) {

    if (!app)
        throw Error("Application is not initialized");

    app.factory('AttendanceReportFactory', ['$http', function($http) {

        var self = this;
        var mem = {};

        self.NotificationResponse = {};

        return {
            getAattendanceReport: function(callback) {
                $http.get('/attendance/all').then(function(response) {
                    callback(response.data.Data);
                }, function(error) {
                    throw Error("/attendance/all call failed");
                });
            },
            saveAttendance: function(attendanceList, callback) {
                $http.post('/attendance/add-attendance', attendanceList).then(function(response) {
                    callback(response.data.Data);
                }, function(error) {
                    throw Error("/attendance/add-attendance call failed");
                });
            },

            getStudentDetails: function(id, callback) {
                $http.get('/student?id=' + id).then(function(response) {
                    callback(response.data.Data);
                }, function(error) {
                    throw Error('/student?id=' + id + ' call failed');
                });
            },
            getAllStudents: function(callback) {
                $http.get('/student/all').then(function(response) {
                    callback(response.data.Data);
                }, function(error) {
                    throw Error("/student/all call failed");
                });
            },
            saveStudents: function(studentList, callback) {
                $http.post('/student/add-student', studentList).then(function(response) {
                    callback(response.data.Data);
                }, function(error) {
                    throw Error("/student/add-student call failed");
                });
            },


            getClassRoom: function(id, callback) {
                $http.get('/class-room?id=' + id).then(function(response) {
                    callback(response.data.Data);
                }, function(err) {
                    throw Error('/class-room?id=' + id + ' call failed');
                });
            },
            getAllClassRooms: function(callback) {
                $http.get('/class-room/all').then(function(response) {
                    callback(response.data.Data);
                }, function(err) {
                    throw Error('/add-class-room call failed');
                });
            },
            saveClassRooms: function(classRoomList, callback) {
                $http.post('/class-room/add-class-room', classRoomList).then(function(response) {
                    callback(response.data.Data);
                }, function(error) {
                    throw Error('/class-room/add call failed');
                });

            },

            getLoggedInUser: function(callback) {
                $http.get('/auth/get-logged-in-user').then(function(response) {
                    callback(response.data);
                }, function(error) {
                    throw Error('/auth/is-authenticated call failed');
                });
            },

            getUserRoles: function(callback) {
                $http.get('/profile/get-user-roles').then(function(response) {
                    callback(response.data);
                }, function(error) {
                    throw Error('/profile/get-user-roles call failed');
                });
            },
            getProfileDetails: function(callback) {
                $http.get('/profile/get-user-details').then(function(response) {
                    callback(response.data);
                }, function(error) {
                    throw Error('/profile/get-user-details call failed');
                });
            },
            updateUserDetails: function(user, callback) {
                $http.post('/profile/update-user-details', user).then(function(response) {
                    callback(response.data);
                }, function(error) {
                    throw Error('/profile/update-user-details call failed');
                });
            },

            setNotification: function(status, message) {

                var notificationScope = self.get('NotificationController');
                notificationScope.Model = notificationScope.Model || {};
                notificationScope.Model.Status = status;
                notificationScope.Model.Message = message;
            },

            store: function(key, value) {
                if (typeof Storage !== "undefined") {
                    localStorage.setItem(key, JSON.stringify(value));
                } else {
                    mem[key] = value;
                }
            },

            get: function(key) {
                if (typeof(Storage) !== "undefined") {
                    var value = localStorage.getItem(key);
                    if (value) {
                        return JSON.parse(value)
                    }
                    return null;

                } else {
                    return mem[key];
                }
            },

            clear: function() {
                if (typeof(Storage) !== "undefined") {
                    var value = localStorage.clear();

                } else {
                    return mem = {};
                }
            }
        };
    }]);

})(window.app = window.app || {});
