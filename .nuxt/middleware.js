const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['check-auth'] = require('../middleware/check-auth.js')
middleware['check-auth'] = middleware['check-auth'].default || middleware['check-auth']

middleware['home-redirect'] = require('../middleware/home-redirect.js')
middleware['home-redirect'] = middleware['home-redirect'].default || middleware['home-redirect']

middleware['isAuth'] = require('../middleware/isAuth.js')
middleware['isAuth'] = middleware['isAuth'].default || middleware['isAuth']

middleware['isTutor'] = require('../middleware/isTutor.js')
middleware['isTutor'] = middleware['isTutor'].default || middleware['isTutor']

export default middleware
