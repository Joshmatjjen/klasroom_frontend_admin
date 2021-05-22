export default function (context) {
  console.log('[Middleware] check-auth')
  context.redirect('/dashboard')
}
