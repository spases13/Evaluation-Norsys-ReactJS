interface SideBarItem {
  onClick: () => void;
  selectedMenuIndex: number | null;
  href : string;
  index: number;
  iconClassName : string
  labelName : string
}

const SideBarItem = (props : SideBarItem) => {
  return (
    <a href={props.href}>
      <li
        onClick={props.onClick}
        className={`${props.selectedMenuIndex === props.index ? "selected" : ""} menu_item`}
      >
        <span className="menu_item_icon">
          <i className={props.iconClassName}></i>
        </span>
        <span className="menu_item_label">{props.labelName}</span>
      </li>
    </a>
  );
};

export default SideBarItem;
