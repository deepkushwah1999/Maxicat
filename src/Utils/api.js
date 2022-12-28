import { ToastAndroid, Alert } from 'react-native';
import Config from './Config';
// import AsyncStorage from '@react-native-community/async-storage';
// import NetInfo from '@react-native-community/netinfo';
// import {Keys} from './Keys';
// import {MyUrls} from './MyUrls';
// import MyStrings from './MyStrings';


// export const USER_KEY = 'auth-key';
// export const USER = 'user-key';


// export const console.log = (message, isProduction = false) => {
//     if (!isProduction) {
//         console.log(message);
//     }
// };
// export const console_log_message = (text, message, isProduction = false) => {
//     if (!isProduction) {
//         console.log(text + ' : ' + message);
//     }
// };

// export const successAlert = (message) => {
//     Alert.alert('Success', message);
// };
// export const errorAlert = (message) => {
//     Alert.alert('Error', message);
// };
// export const simpleAlert = (message) => {
//     Alert.alert('Alert', message);
// };


// export const showAlertMethod = (title, message, setShow, setAlertTitle, setAlertMessage) => {
//     setShow(true);
//     setAlertTitle(title);
//     setAlertMessage(message);

// };

// export const actionAlert = (message, okayPress) => {
//     Alert.alert(
//         'Success',
//         message,
//         [
//             {
//                 text: 'Okay',
//                 onPress: () => okayPress(),
//             },
//         ],
//         {cancelable: false});
// };


// export const getLocalizedDate = (str) => {
//     // var str = "2019-08-02 05:50:00";

//     var year = str.substring(0, 4);
//     var month = str.substring(5, 7);
//     var day = str.substring(8, 10);
//     var hour = str.substring(11, 13);
//     var minute = str.substring(14, 16);
//     var second = str.substring(17, 19);

//     // 2019-01-01T00:00:00
//     // var ns = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second

//     var date = Date.UTC(year, month - 1, day, hour, minute, second);


//     // console.log('Date String: ' + ns)
//     // console.log('Date utc seconds: ' + date)
//     // console.log('Date from seconds: ' + new Date(date).toString())

//     return new Date(date);

// };
// export const getLocalizedDate2 = (str) => {
//     // var str = "2019-08-02 05:50:00";
//     // 2019-08-03T14:24:06.000000Z

//     var year = str.substring(0, 4);
//     var month = str.substring(5, 7);
//     var day = str.substring(8, 10);
//     var hour = str.substring(11, 13);
//     var minute = str.substring(14, 16);
//     var second = str.substring(17, 19);

//     var date = Date.UTC(str);


//     // console.log('Date String: ' + ns)
//     // console.log('Date utc seconds: ' + date)
//     // console.log('Date from seconds: ' + new Date(date).toString())

//     return new Date(date);

// };

// export const strip_html_tags = (str) => {
//     if ((str === null) || (str === '')) {
//         return false;
//     } else {
//         str = str.toString();
//     }
//     return str.replace(/<[^>]*>/g, '');
// };


// export const saveMainObject = (key, object) => {
//     return new Promise((resolve, reject) => {

//         AsyncStorage.setItem(key, object)
//             .then(() => {
//                 // console.log(object)
//                 resolve(true);
//             })
//             .catch(() => {
//                 reject(false);
//             });

//     });
// };
// export const getSavedObject = (key) => {
//     // console.log('calling')
//     return new Promise((resolve, reject) => {
//         AsyncStorage.getItem(key)
//             .then(res => {
//                 // console.log(JSON.stringify(res))
//                 if (res !== null) {
//                     resolve(res);
//                 } else {
//                     // console.log("data not found")
//                     resolve(false);
//                 }
//             })
//             .catch(err => {
//                 console.log('Error fetching saved item: ' + err);
//                 reject(err);
//             });
//     });
// };


// export const isNetConnected = () => {
//     return new Promise((resolve, reject) => {
//         NetInfo.fetch().then(state => {
//             // console.log(state.isConnected);
//             if (state.isConnected) {
//                 resolve(true);
//             } else {
//                 errorAlert(MyStrings.internet_error);
//                 reject(false);
//             }
//         }).catch(() => {
//             errorAlert(MyStrings.internet_error);
//             reject(false);
//         });

//     });
// };

// export const setShowAlert = (title, message) => {

// };

// export const getUserPin=(setUserPin)=>{
//     getObject(Keys.user_data_key).then(res=>{
//         if (res.status){
//             setUserPin(res.data.profile_information.pin_number)
//         }
//     })
// }

// export const saveObject = (key, object) => {
//     let str = JSON.stringify(object);
//     return new Promise((resolve, reject) => {
//         AsyncStorage.setItem(key, str)
//             .then(() => {
//                 resolve(true);
//             })
//             .catch((err) => {
//                 console.log('error while saving' + err);
//                 reject(false);
//             });
//     });
// };
// export const getObject = (key) => {
//     return new Promise((resolve, reject) => {
//         AsyncStorage.getItem(key)
//             .then(res => {
//                 if (res !== null) {
//                     resolve({status: true, data: JSON.parse(res)});
//                 } else {
//                     resolve({status: false});
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//                 reject(err);
//             });
//     });
// };

// export const clearAllData = () => {
//     return new Promise((resolve, reject) => {

//         AsyncStorage.getAllKeys()
//             .then(keys => AsyncStorage.multiRemove(keys))
//             .then(() => {
//                 // console.log('success');
//                 resolve();
//             })
//             .catch(() => reject);
//     });
// };

// export const clearObject = (key) => {
//     return new Promise((resolve, reject) => {
//         AsyncStorage.removeItem(key)
//             .then(() => {
//                 resolve(true);
//             })
//             .catch((err) => {
//                 reject(false);
//             });
//     });
// };


// export const getCities = (city, setCity, setIsLoading) => {
//     return new Promise((resolve, reject) => {

//         isNetConnected()
//             .then(() => {
//                 setIsLoading(true);
//                 getDataWithoutToken(MyUrls.get_all_cities_url, 'GET', '', setIsLoading)
//                     .then((response) => {
//                         if (response.length > 0) {
//                             const c = response.map((i, j) => {
//                                 return {'id': i.id, 'title': i.name};
//                             });
//                             setCity(c);
//                         } else {
//                             setCity([]);
//                             // errorAlert('No city found.');
//                         }
//                         resolve(true);

//                     })
//                     .catch((err) => {
//                         resolve(false);
//                         console.log('error: ' + err);
//                     });
//             });

//     });

// };

// export const getAreasOfCity = (selectedCity, area, setArea, setIsLoading) => {
//     isNetConnected()
//         .then(() => {
//             let formData = new FormData();
//             formData.append('city_id', selectedCity.id);
//             getDataWithoutToken(MyUrls.get_sub_area_by_city_url, 'POST', formData, setIsLoading)
//                 .then((response) => {
//                     // console.log(response)
//                     // console.log(response.length)
//                     if (response.length > 0) {
//                         const c = response.map((i, j) => {
//                             return {'id': i.id, 'title': i.name};
//                         });
//                         setArea(c);
//                     } else {
//                         // console.log('setArea')
//                         // console.log(area)
//                         setArea([]);
//                         // errorAlert('No area found.');
//                     }

//                 })
//                 .catch((err) => {
//                     console.log('error: ' + err);
//                 });
//         });
// };

// export const parseError = (error) => {
//     var m = error;
//     var keys = [];
//     for (var k in m) {
//         keys.push(k);
//     }

//     var mforuser = '';
//     // console.log('key 0 ' + (m[keys[0]]))

//     for (var k in keys) {
//         mforuser = mforuser + m[keys[k]] + '\n';
//     }

//     return mforuser;
// };

// export const getMonthName=(m)=>{
//     let month = new Array();
//     month[0] = "January";
//     month[1] = "February";
//     month[2] = "March";
//     month[3] = "April";
//     month[4] = "May";
//     month[5] = "June";
//     month[6] = "July";
//     month[7] = "August";
//     month[8] = "September";
//     month[9] = "October";
//     month[10] = "November";
//     month[11] = "December";

//     return month[m]
// }
// export const getDayName=(d)=>{
//     let arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//     return arrayOfWeekdays[d]
// }

// export function isNumeric(str) {
//     if (typeof str != "string") return false // we only process strings!
//     return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
//         !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
// }
// export function isNormalInteger(str) {
//     return /^\+?\d+$/.test(str);
// }


export const apiWithTokenMultipart = (url, method, formData, token, setLoader) => {
    console.log('endpoint-->' + url);
    formData ? console.log('data-->', formData) : null;
    setLoader ? setLoader(true) : null;
    return new Promise((resolve, reject) => {
        let s = 404;
        let header = {
            'Authorization': 'Bearer ' + (token),
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data"
        };

        const options = {
            method: method,
            headers: header,
        }
        if ((method !== 'GET' && method !== 'get')) options.body = (formData)
        fetch(Config.baseUrl + url, options)
            .then((response) => {
                setLoader ? setLoader(false) : null;
                const statusCode = response.status;
                let data = response.json();
                s = statusCode;
                return Promise.all([statusCode, data]);
            })
            .then(([status, data]) => {
                setLoader ? setLoader(false) : null;
                if (status === 500) {
                    reject('Server Error' + JSON.stringify(data));
                }
                console.log('response--->',JSON.stringify( data))
                resolve(data);

            })
            .catch((error) => {
                setLoader ? setLoader(false) : null;
                if (s === 200) {
                    resolve({ 'status': true });
                } else {
                    console.log('Error Status Code: ' + s);
                    console.log('Error: ' + error);
                }
                reject(error);
            });
    });

};

export const apiWithToken = (url, method, formData, token, setLoader) => {
    console.log('endpoint-->' + url);
    formData ? console.log('data-->', formData) : null;
    setLoader ? setLoader(true) : null;
    return new Promise((resolve, reject) => {
        let s = 404;
        let header = {
            'Authorization': 'Bearer ' + (token),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const options = {
            method: method,
            headers: header,
        }
        if ((method !== 'GET' && method !== 'get')) options.body = JSON.stringify(formData)
        fetch(Config.baseUrl + url, options)
            .then((response) => {
                setLoader ? setLoader(false) : null;
                const statusCode = response.status;
                let data = response.json();
                s = statusCode;
                return Promise.all([statusCode, data]);
            })
            .then(([status, data]) => {
                setLoader ? setLoader(false) : null;
                if (status === 500) {
                    reject('Server Error' + JSON.stringify(data));
                }
                console.log('response--->',JSON.stringify( data))
                resolve(data);

            })
            .catch((error) => {
                setLoader ? setLoader(false) : null;
                if (s === 200) {
                    resolve({ 'status': true });
                } else {
                    console.log('Error Status Code: ' + s);
                    console.log('Error: ' + error);
                }
                reject(error);
            });
    });

};
export const api = (url, method, formData, setLoader) => {
    console.log('endpoint-->' + url);
    console.log('data-->', formData);
    setLoader ? setLoader(true) : null;
    return new Promise((resolve, reject) => {
        let s = 404;
        fetch(Config.baseUrl + url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                setLoader ? setLoader(false) : null;
                const statusCode = response.status;
                let data = response.json();
                s = statusCode;
                return Promise.all([statusCode, data]);
            })
            .then(([status, data]) => {
                // console.log(JSON.stringify (data))
                setLoader ? setLoader(false) : null;
                if (status === 500) {
                    reject('Server Error');
                } else if (status === 422) {
                    resolve(data);
                }
                console.log('response--->',JSON.stringify( data))
                resolve(data);
            })
            .catch((error) => {
                setLoader ? setLoader(false) : null;
                if (s === 200) {
                    resolve({ 'status': true });
                    s = 401;
                } else {
                    console.log('Error Status Code: ' + s);
                    console.log('Error: ' + error);
                }
                reject(error);
            });

    });

};










