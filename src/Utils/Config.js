
const  Config = {
 imgBaseUrl : 'http://104.149.186.46:3000/',
 base : 'http://104.149.186.46:3000/',
 baseUrl : 'http://104.149.186.46:3000/api/',
 mapsApiKey : '&key=AIzaSyAOfvwprFhTik0bSONiOm7t3UB8ePwVRIY',
 LocationLink : 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',

 type:{
    post:'POST',
    get:'GET'
 },

 endpoints:{
    loginWithPhone: 'auth/login_with_phone',
    register: 'auth/register',
    verify: 'auth/verify',
    setPassword: 'auth/password_for_new_user',
    updateUser: 'auth/profile/update',

    getConversations: 'conversations/',
    createConversation: 'conversations',
    getAllMessages: 'messages',
    sendNewMessage: 'messages',
    sendFileMessage: 'messages/send/attachment',
    getAllUsers: 'auth/users',
    
 },
 getImageUrl:(path)=> Config.imgBaseUrl+path?? ''
    
}



export default Config