export default async function handler() {
  return new Response('Edge Function: two/handler', {
    status: 200,
  });
}