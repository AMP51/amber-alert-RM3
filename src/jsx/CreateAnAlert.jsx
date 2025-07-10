import './css/CreateAnAlert.css'

function CreateAnAlert() {
    return (
        <>
            <div style="background-color: AE0000;">
                {/*  <img src={Logo} className="logo" alt="Amber Alert logo" /> */}
                <h1>
                    Create An Alert
                </h1>


            </div>

            <div>



                <label for = "tName">Name Of Missing Person</label>
                <input type = "text" id="tName" name="tName"> </input>

                <label for="tTime">Time Of Missing Disappearance</label>
                <input type="time" id="tTime" name="tTime"></input>

                <label for="tDescription">Description of Person and Situation</label>
                <input type="text" id="tDescription" name="tDescription"> </input>

                <label for="tImage">Description of Person and Situation</label>
                <input type="image" id="tImage" name="tImage"> </input>

                <button> Post This Alert</button>
                <button> Clear All Fields</button>
                <button> Return to Home</button>

            </div>

        </>
    )
}

export default CreateAnAlert


