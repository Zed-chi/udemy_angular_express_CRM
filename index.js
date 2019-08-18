const app = require("./app");
const port_num = process.env.PORT || 5000;

app.get("/", (req, res)=>{
    res.status(200).json({"Fuck":"you"});
});
app.listen(port_num, () => console.log(`Server startanul on ${port_num} port`));
