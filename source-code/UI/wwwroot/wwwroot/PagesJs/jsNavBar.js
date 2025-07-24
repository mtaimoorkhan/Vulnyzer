$(function () {
    frmNavBar.Events.Init();
});
var frmNavBar =
{
    Ids: {
        sidebarnav :'#sidebar-nav'
    },
    Events:
    {
        Init: function () {
            var path = window.location.href;
            $(frmNavBar.Ids.sidebarnav + ' li a').each(function () {
                if (this.href === path) {
                    $(this).removeClass('active');
                    $(this).addClass('active');
                    $(this).parent().parent().removeClass('collapse');
                    $(this).parent().parent().parent().children("a.nav-link").removeClass('collapsed');
                    $(this).removeClass('collapsed');
                }
            });
        }
    }    
}