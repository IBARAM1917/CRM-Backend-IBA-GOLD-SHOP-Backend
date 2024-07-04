const User = require("../Models/userModel.js");




const postquery=async(req,res,next)=>{

        const { username, email,query } = req.body;
        if (
          !username ||
          !email ||
          !query ||
          username === "" ||
          email === "" ||
         query === ""
        ) {
          return next(errorHandler(400, "All The Fields Are Required"));
        }
        const hashedQuery = await bcrypt.hash(query);
      
        const newUser = new User({ username, email, query: hashedQuery });
        try {
          await newUser.save();
          res
            .status(201)
            .json({ message: "Query Sent Successfuly", result: newUser });
        } catch (error) {
          next(error);
        }
      };
module.exports={postquery};