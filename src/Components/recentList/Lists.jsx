import React from "react";
import RecentList from "./RecentList";

function Lists() {
  return (
    <div>
      <RecentList type="transactions" />
      <RecentList type="blocks" />
    </div>
  );
}

export default Lists;
