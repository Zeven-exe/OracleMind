export default async (req, context) => {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    try {
        const API_KEY = Netlify.env.get("GROQ_API_KEY");
        if (!API_KEY) return new Response(JSON.stringify({ error: "Server Error: API Key missing" }), { status: 500 });

        const body = await req.json();
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: body.messages,
                temperature: 0.6,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};