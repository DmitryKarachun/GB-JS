$(".polzunok-5").slider({
    min: 0,
    max: 5000,
    values: [2000, 3000],
    range: true,
    animate: "fast",
    slide : function(event, ui) {    
        $(".polzunok-input-5-left").val(ui.values[ 0 ]);   
        $(".polzunok-input-5-right").val(ui.values[ 1 ]);  
    }    
});
$(".polzunok-input-5-left").val($(".polzunok-5").slider("values", 0));
$(".polzunok-input-5-right").val($(".polzunok-5").slider("values", 1));
$(".polzunok-container-5 input").change(function() {
    var input_left = $(".polzunok-input-5-left").val().replace(/[^0-9]/g, ''),    
    opt_left = $(".polzunok-5").slider("option", "min"),
    where_right = $(".polzunok-5").slider("values", 1),
    input_right = $(".polzunok-input-5-right").val().replace(/[^0-9]/g, ''),    
    opt_right = $(".polzunok-5").slider("option", "max"),
    where_left = $(".polzunok-5").slider("values", 0); 
    if (input_left > where_right) { 
        input_left = where_right; 
    }
    if (input_left < opt_left) {
        input_left = opt_left; 
    }
    if (input_left == "") {
    input_left = 0;    
    }        
    if (input_right < where_left) { 
        input_right = where_left; 
    }
    if (input_right > opt_right) {
        input_right = opt_right; 
    }
    if (input_right == "") {
    input_right = 0;    
    }    
    $(".polzunok-input-5-left").val(input_left); 
    $(".polzunok-input-5-right").val(input_right); 
    if (input_left != where_left) {
        $(".polzunok-5").slider("values", 0, input_left);
    }
    if (input_right != where_right) {
        $(".polzunok-5").slider("values", 1, input_right);
    }
});
function getPageList (totalPages, page,maxLength) {
    function range (start, end){
        return Array.from(Array(end - start + 1), (_, i)=>i + start);
    }
    var sideWidth = maxLength < 9 ? 1 : 2;
    let leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    let rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

    if (totalPages <= maxLength) {
        return range(1, totalPages);
    }
    if (page <= maxLength - sideWidth -1 - rightWidth) {
        return range (1,  maxLength - sideWidth - 1).concat(0,range(totalPages - sideWidth +1, totalPages));
    }
    if(page >= totalPages - sideWidth - 1 - rightWidth){
        return range(1, sideWidth).concat(0, range(totalPages - 1 - rightWidth - leftWidth, totalPages));      
    }
    return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

$(function(){
    var numberOfItems = $(".product__body .product__column").length;
    var limitPerPage = 3;
    var totalPages = Math.ceil (numberOfItems / limitPerPage);
    var paginationSize = 10; 
    var currentPage;

    function showPage(whichPage) {
        if(whichPage < 1 || whichPage > totalPages) return false;

        currentPage = whichPage;

        $(".product__body .product__column").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
        
        $(".pagination li").slice(1,-1).remove();

        getPageList(totalPages, currentPage, paginationSize).forEach(item=> {
            $("<li>").addClass("page-item").addClass(item ? "current-page": "dots").toggleClass("active", item === currentPage).append($("<a>").addClass("page-link").attr({href: "javasript:void(0)"}).text(item || "...")).insertBefore(".next-page");
        });
        $(".previous-page").toggleClass("disable", currentPage ===1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        return true;
    }
    
    $("pagination").append (
        $("<li>").addClass ("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Prev")),
        $("<li>").addClass ("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({href: "javascript:void(0)"}).text("Next"))
    );

    $(".product__body").show();
    showPage(2);

    $(document).on("click", ".pagination li.current-page:not(.active)", function(){
        return showPage(+$(this).text());
    });

    $(".next-page").on("click", function(){
        return showPage(currentPage + 1);
    });

    $(".previous-page").on("click", function(){
        return showPage(currentPage - 1);
    });
});