export default async function handler() {
  return new Response('Edge Function: /endpoint', {
    status: 200,
  });
}