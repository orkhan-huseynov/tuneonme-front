let config = {
    // General
    storagePath: 'http://tuneon.me/storage/images/',

    // Auth
    getTokenUrl: '/oauth/token',
    checkTokenUrl: '/api/check-token',
    logoutUrl: '/api/logout',

    // Profile
    emailExistsUrl: '/api/email_exists',
    storeProfileUrl: '/api/profile',
    getCurrentUserUrl: '/api/get-current-user-details',
    storeProfilePictureUrl: '/api/store-profile-picture',
    saveNameLastnameUrl: '/api/save-profile-name-lastname',
};

export default config;