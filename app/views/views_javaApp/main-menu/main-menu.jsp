<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="/struts-tags" %>

<%--ACCIONES--%>
<s:url action="item-lookup" var="itemLookup_Action" />
<s:url action="line-busting" var="lineBoosting_Action" />
<s:url action="inventory-management" var="inventoryManagement_Action" />
<s:url action="client-dashboard" var="clientDashboard_Action" />
<s:url action="store-management" var="storeManagement_Action" />
<s:url action="staff-control" var="staffControl_Action" />

    <div id="menu_box" class="col-xs-11 row menu-font">
        <div class="menu_opciones_list col-xs-offset-1 col-xs-11">
            <div class="enlace_btn_box">
                <a href="<s:property value="#itemLookup_Action" />">
                    <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/1+.png" alt="">
                    <span class="nombre_opcion">Item lookup</span>
                </a>
            </div>
            <div class="enlace_btn_box">
                <a href="<s:property value="#lineBoosting_Action" />">
                    <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/2+.png" alt="">
                    <span class="nombre_opcion">Line boosting</span>
                </a>
            </div>
            <div class="enlace_btn_box">
                <a href="<s:property value="#inventoryManagement_Action" />">
                    <img class="btnImg" src="${pageContext.request.contextPath}/images/base/3+.png" alt="">
                    <span class="nombre_opcion">Inventory management</span>
                </a>
            </div>
            <div class="enlace_btn_box">
                <a href="<s:property value="#clientDashboard_Action" />">
                    <img class="imagen_btn" src="${pageContext.request.contextPath}/images/base/4+.png" alt="">
                    <span class="nombre_opcion">Client dashboard</span>
                </a>
            </div>
            <div class="enlace_btn_box">
                <a href="<s:property value="#storeManagement_Action" />">
                    <img  class="imagen_btn" src="${pageContext.request.contextPath}/images/base/5+.png" alt="">
                    <span class="nombre_opcion">Store management</span>
                </a>
            </div>
            <div class="enlace_btn_box">
                <a href="<s:property value="#staffControl_Action" />">
                    <img  class="imagen_btn" src="${pageContext.request.contextPath}/images/base/6+.png" alt="">
                    <span class="nombre_opcion">Staff control</span>
                </a>
            </div>
        </div>
    </div>