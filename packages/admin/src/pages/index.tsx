import React from "react";

const IndexPage = () => {
    const [data, setData] = React.useState([]);
    const [command, setCommand] = React.useState("");
    const [response, setResponse] = React.useState("");
    React.useEffect(() => {
        fetch("http://localhost:4040/commands")
            .then(res => res.json())
            .then(res => setData(res))
            .catch(err => console.log({ err }));
    }, []);

    const onSubmit = () => {
        fetch("http://localhost:4040/commands", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ command, response })
        })
            .then(res => res.json())
            .then(res => setData(data => data.concat(res)))
            .catch(err => console.log({ err }));
    };
    return (
        <div>
            <h1>Hey</h1>
            <input
                type="text"
                value={command}
                onChange={e => setCommand(e.currentTarget.value)}
            />
            <input
                type="text"
                value={response}
                onChange={e => setResponse(e.currentTarget.value)}
            />
            <button type="button" onClick={onSubmit}>
                Submit
            </button>
            <div>
                <pre>{JSON.stringify({ data }, null, 2)}</pre>
            </div>
        </div>
    );
};

export default IndexPage;
