async function testStream() {
    try {
        console.log('Fetching from http://localhost:3000/api/chat...');
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Hola, ¿cómo estás?' }]
            })
        });

        if (!response.ok) {
            console.error('Response not OK:', response.status, response.statusText);
            const text = await response.text();
            console.error('Body:', text);
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        console.log('--- Stream Start ---');
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                console.log('\n--- Stream End ---');
                console.log('Full content length:', fullContent.length);
                console.log('Full content:', fullContent);
                break;
            }
            const chunk = decoder.decode(value, { stream: true });
            console.log(`Chunk [${chunk.length}]:`, JSON.stringify(chunk));
            // Print hex of chunk
            const hex = Array.from(chunk).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
            console.log('Hex:', hex);

            fullContent += chunk;
        }

    } catch (e) {
        console.error('Error:', e);
    }
}

testStream();
