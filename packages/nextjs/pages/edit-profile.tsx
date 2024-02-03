import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const EditProfile: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-4 bg-white">
        <div className="container mx-auto grid grid-cols-[30%,70%]">
          <div>hey</div>
          <div>
            <h3>Upload Details</h3>
            <form>
              <div className="my-3">
                <label htmlFor="title">Title</label> <br />
                <input type="text" placeholder="Buidlers INC" className="border p-2 rounded-md min-w-[20rem] mt-3" />
              </div>
              <div className="my-3">
                <label htmlFor="description">Description</label> <br />
                <textarea
                  rows={6}
                  placeholder="Description"
                  className="border p-2 rounded-md min-w-[20rem] mt-3 w-[80%]"
                />
              </div>
              <hr className="my-8 w-[80%]" />
              <h3>Links</h3>
              <div className="w-[80%] grid grid-cols-2 gap-6">
                <div className="my-3">
                  <label htmlFor="description">Github</label> <br />
                  <input type="text" placeholder="" className="border p-2 rounded-md min-w-[20rem] mt-3" />
                </div>
                <div className="my-3">
                  <label htmlFor="description">Link</label> <br />
                  <input type="text" placeholder="" className="border p-2 rounded-md min-w-[20rem] mt-3" />
                </div>
                <div className="my-3">
                  <label htmlFor="description">Youtube</label> <br />
                  <input type="text" placeholder="" className="border p-2 rounded-md min-w-[20rem] mt-3" />
                </div>

                <div className="my-3">
                  <label htmlFor="description">Twitter</label> <br />
                  <input type="text" placeholder="" className="border p-2 rounded-md min-w-[20rem] mt-3" />
                </div>
              </div>

              <button className="w-[80%] btn my-5 rounded-md"> Upload</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
