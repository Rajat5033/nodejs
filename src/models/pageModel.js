import mongoose from "mongoose";
const pageSchema = new mongoose.Schema({
  pageName: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  title: {
    type: String,
    require: false,
  },
  description:{
    type: String,
    require: false,
  },
  shortDescription:{
    type: String,
    require: false,
  },
  buttonName:{
    type: String,
    require: false,
  },
});
const Page = mongoose.model("Page", pageSchema);
export default Page;