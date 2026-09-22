export async function openCatalog(router, route) {
  if (route.name === 'home') {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (window.location.hash !== '#catalog') {
      history.replaceState(null, '', '/#catalog')
    }
    return
  }
  await router.push({ path: '/', hash: '#catalog' })
}
