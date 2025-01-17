self.addEventListener("fetch", (event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            // Successful response
            let newHeaders = new Headers(response.headers);
            newHeaders.append("X-Content-Type-Options", "nosniff");
            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: newHeaders,
            });
          } else {
            // Response with an error status
            return new Response("Error fetching response", {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers({
                "Content-Type": "text/plain",
              }),
            });
          }
        })
        .catch((error) => {
          // Network error, provide a valid Status
          return new Response("Network error", {
            status: 500,
            statusText: "Network error",
            headers: new Headers({
              "Content-Type": "text/plain",
            }),
          });
        })
    );
  }
});
