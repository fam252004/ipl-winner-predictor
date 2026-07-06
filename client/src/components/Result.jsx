function Result({ result }) {

    return (

        <div
            style={{
                marginTop: "40px",
                textAlign: "center"
            }}
        >

            <h2>

                🏆 Winner

            </h2>

            <h1>

                {result.winner}

            </h1>

            <h3>

                Winning Probability

            </h3>

            <h2>

                {result.probability} %

            </h2>

        </div>

    );

}

export default Result;