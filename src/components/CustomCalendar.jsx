import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { observer } from "mobx-react";
import jobStore from "../store/job";
import { useEffect, useState } from "react";
import { toJS } from "mobx";
import { JobModal } from "./Modal";

const Toolbar = (props) => {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <div className="rbc-toolbar">
      <span style={{ fontSize: "40px" }} className="rbc-btn-group">
        <span
          style={{
            cursor: "pointer",
            color: "#999",
            fontWeight: 700,
          }}
          onClick={navigate.bind(null, "PREV")}
        >
          {"<"}
        </span>

        <span
          style={{
            color: "#ff6813",
            fontWeight: 700,
          }}
          className="rbc-toolbar-label"
        >{`${date.getFullYear()}. ${date.getMonth() + 1}`}</span>
        <span
          style={{
            cursor: "pointer",
            color: "#999",
            fontWeight: 700,
          }}
          onClick={navigate.bind(null, "PREV")}
        >
          {">"}
        </span>
      </span>
    </div>
  );
};

const CustomCalendar = observer(() => {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const { getPostingList, startList, endList, setItem, selectItem } = jobStore;
  const [modalOpen, setModalOpen] = useState(false);

  const onSelect = (e) => {
    setItem(e);
    setModalOpen(true);
  };

  useEffect(() => {
    getPostingList();
  }, []);

  if (startList.length === 0 || endList.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Calendar
        localizer={localizer}
        style={{ height: 750, width: 1000 }}
        events={[...startList, ...endList]}
        components={{
          toolbar: Toolbar,
        }}
        onSelectEvent={onSelect}
      />
      <JobModal
        item={selectItem}
        show={modalOpen}
        onHide={() => setModalOpen(false)}
      />
    </>
  );
});
export default CustomCalendar;
