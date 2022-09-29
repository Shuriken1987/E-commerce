export const routeConfig = {
    HOME: {
        url: '/'
    },
    SHOP: {
        url: '/shop'
    },
    PRODUCT_SHOP: {
        url: '/shop/product/:productId',
        realUrl: productId => `/shop/product/${productId}`
    },
    CONTACT: {
        url: '/contact'
    },
    AUTH: {
        url: '/auth'
    },
    USER_ACTIVATE: {
        url: '/user-activate/:id',
        realUrl: id => `/user-activate/${id}`
    },
    USER_PROFILE: {
        url: '/profile'
    },
    MY_ORDERS: {
        url: '/my-orders'
    },
    ORDER: {
        url: '/order'
    },
    UNSUBSCRIBE: {
        url: '/unsubscribe/:id',
        realUrl: id => `/unsubscribe/${id}`,
    },
    ABOUT: {
        url: '/about'
    },
    DASHBOARD: {
        url: '/dashboard'
    },
    ADMIN_COMMENTS: {
        url: 'comments',
    },
    ADMIN_USERS: {
        url: 'users',
    },
    ADMIN_PRODUCTS: {
        url: 'products',
    },
    ADMIN_ADD_PRODUCT: {
        url: 'add-product',
    },
    ADMIN_SUBSCRIBERS: {
        url: 'subscribers',
    },
    ADMIN_ORDERS: {
        url: 'orders',
    },
}