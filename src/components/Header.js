import React, { useEffect, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import { data as menuItems } from "../menuItems.json";
import ChildMenu from "./common/ChildMenu";
import { getMenuItemsFromPath } from "../util/functions";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setPath, setPathMain } from "../store/actions";

function Header({ history }) {
    const dispatch = useDispatch();
    const { pathMain } = useSelector((state) => state.path);

    // 초기 PATH 설정
    // Refresh 후에도 path 유지
    useEffect(() => {
        dispatch(setPath(history.location.pathname));
    }, [dispatch, history]); // currentPage

    const menuItemChildren = useMemo(() => getMenuItemsFromPath(pathMain), [
        pathMain,
    ]);

    // page 클릭시 서브메뉴 활성화
    const onClick = (page) => {
        dispatch(setPathMain(page));
        history.push(page);
    };

    // 메인 로고 클릭시 홈으로
    const onClickLogo = () => {
        dispatch(setPath("/"));
        history.push("/");
    };

    return (
        <div className="header">
            <div className="header__Logo">
                <Link to="/" onClick={onClickLogo}>
                    REACT MISSION
                </Link>
            </div>
            {/* MAIN PAGE NAV */}
            <div className="header__mainMenu">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.url}
                        to={item.url}
                        activeClassName="active"
                        // className={item.url === pathMain ? "active" : ""}
                        onClick={() => onClick(item.url)}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
            {/* SUB PAGE NAV */}
            {pathMain && (
                <ChildMenu
                    styleName="header"
                    menuItem={menuItemChildren}
                    onClick={() => onClick(menuItemChildren.url)}
                />
            )}
        </div>
    );
}

export default Header;
