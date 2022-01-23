import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
class Job {
  startList = [];
  endList = [];
  selectItem = {};

  constructor() {
    makeAutoObservable(this);
  }

  setItem = (item) => {
    runInAction(() => {
      this.selectItem = item;
    });
  };

  getPostingList = async () => {
    await axios
      .get(
        "https://frontend-assignments.s3.ap-northeast-2.amazonaws.com/job_postings.json"
      )
      .then(({ data }) => {
        runInAction(() => {
          this.startList = data.map((item) => {
            return {
              id: item.id,
              title: item.name,
              start: new Date(item.start_time),
              end: new Date(item.start_time),
              content: item.content,
              image: item.image,
              ...item,
            };
          });
          this.endList = data.map((item) => {
            return {
              id: item.id,
              title: item.name,
              start: new Date(item.end_time),
              end: new Date(item.end_time),
              content: item.content,
              image: item.image,
              ...item,
            };
          });
          this.selectItem = {
            id: data[0].id,
            title: data[0].name,
            start: new Date(data[0].start_time),
            end: new Date(data[0].end_time),
            content: data[0].content,
            image: data[0].image,
          };
        });
      });
  };
}

const jobStore = new Job();
export default jobStore;
