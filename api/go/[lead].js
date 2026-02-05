export const config = { runtime: 'edge' };

const redirects = {
  valley: 'https://valley-plastic-surgery-preview.vercel.app',
  guerra: 'https://guerra-plastic-surgery-preview.vercel.app',
  jeneby: 'https://jeneby-plastic-surgery-preview.vercel.app',
  tampa: 'https://tampa-mommy-makeover-preview.vercel.app',
  law: 'https://michael-law-preview.vercel.app',
  tonypham: 'https://brycedmorgan.github.io/dr-tony-pham/',
  perimeter: 'https://brycedmorgan.github.io/perimeter-plastic-surgery/',
  poggi: 'https://poggi-plastic-surgery-new-kappa.vercel.app',
  bluewater: 'https://bluewater-preview.vercel.app',
  wigod: 'https://wigod-plastic-surgery.vercel.app',
  duffy: 'https://jacksonville-plastic-surgery-duffy.vercel.app',
  memphis: 'https://cosmetic-surgery-specialists-memphis.vercel.app'
};

export default async function handler(req) {
  const url = new URL(req.url);
  const lead = url.pathname.split('/').pop();
  const dest = redirects[lead];
  
  if (!dest) {
    return new Response('Not found', { status: 404 });
  }

  // Log the click (append to KV, or POST to sheet, or console for now)
  console.log(JSON.stringify({
    event: 'click',
    lead,
    timestamp: new Date().toISOString(),
    ip: req.headers.get('x-forwarded-for') || 'unknown',
    ua: req.headers.get('user-agent')
  }));

  return Response.redirect(dest, 302);
}
