import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

export default function GenerateSecretCode() {
    const [gender, setGender] = useState('');
    const [isGenderValid, setIfValidGender] = useState(false);
    const [secretCode, setSecretCode] = useState('');
    const genderData = ["boy", "girl"];
    const getSecretCode = () => {
        let randomNo = Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100
        let generatedCode = btoa(gender + "##" + randomNo);
        setSecretCode(generatedCode);
    }

    const handleUserInput = (e) => {
        if (e.target.value && genderData.includes(e.target.value.toLowerCase())) {
            setIfValidGender(true);
        } else {
            if (isGenderValid) {
                setIfValidGender(false);
            }
        }
        setGender(e.target.value);
    }

    const copyText = () => {
        var copyText = document.getElementById("copyCode");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
    }
    return (
        <div className={"gen-secret-code-container"}>
            <InputLabel className={"gender-input-label"}>Enter gender</InputLabel>
            <TextField id="gender" name="gender" className={"hideText"} value={gender} onChange={(e) => handleUserInput(e)} type="text" variant="outlined" margin="normal" required fullWidth />
            <Button type="button" disabled={!isGenderValid} onClick={() => getSecretCode()} fullWidth variant="contained" color="primary">
                Generate Secret Code
            </Button>

            {secretCode && (<><br /><h1>Secret Code: </h1><TextField id="copyCode" name="copyCode" value={secretCode} onChange={() => secretCode} type="text" variant="outlined" margin="normal" required fullWidth />
                <Button type="button" onClick={() => copyText()} fullWidth variant="contained" color="primary">Copy Secret Code</Button></>)}
        </div>
    );
}