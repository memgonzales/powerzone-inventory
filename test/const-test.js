const getDom = function() {
	return `<html>
                <body>
                    <div id = "error"></div>
                    <input type = "text" id = "fname">
                    <button id = "register" disabled></button>
                    <table id = "tbl" style = "visibility: visible;">
                        <tbody>
                            <tr id = "r1"><td>Premium Gasoline 95</td><td>01/01/2022</td><td></td><td>₱ 60</td></tr>
                            <tr id = "r2"><td>Gasoline</td><td>01/02/2022</td><td></td><td>₱ 55</td></tr>
                            <tr id = "r3"><td>Kerosene</td><td>01/03/2022</td><td></td><td>₱ 55</td></tr>
                            <tr id = "r4"><td>Premium Gasoline 97</td><td>01/04/2022</td><td></td><td>₱ 55</td></tr>
                            <tr id = "r5"><td>Diesel</td><td>01/05/2022</td><td></td><td>₱ 55</td></tr>
                            <tr id = "r6"><td>Gasoline</td><td>01/01/2022</td><td></td><td>₱ 60</td></tr>
                            <tr id = "r7"><td>Kerosene</td><td>01/06/2022</td><td></td><td>₱ 111</td></tr>
                            <tr id = "r8"><td>Diesel</td><td>01/07/2022</td><td></td><td>₱ 234</td></tr>
                        </tbody>
                    </table>
                    <table id = "tbl2" style = "visibility: visible;">
                        <tbody>
                            <tr id = "s1">
                                <td></td><td>01/01/2022</td><td>Shell</td><td>₱ 60</td>
                                <td><img src = "/assets/pending.png"></td>
                            </tr>
                            <tr id = "s2">
                                <td></td><td>01/01/2022</td><td>Chevron</td><td>₱ 120.34</td>
                                <td><img src = "/assets/rejected.png"></td>
                            </tr>
                            <tr id = "s3">
                                <td></td><td>01/03/2022</td><td>Petron</td><td>₱ 9.31</td>
                                <td><img src = "/assets/accepted.png"></td>
                            </tr>
                        </tbody>
                    </table>
                </body>
            </html>`;
};

export {getDom};
