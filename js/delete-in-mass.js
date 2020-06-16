var num_deleted_prev = 0;
var num_deleted_cur = 0;
if (window["_userdata"]) _userdata.notifications = 0;

function killall(c, a, b) {
    c = c.replace(/(^\s*|\s*$)/g, "");
    a = a || 0;
    b = b || 9E15;
    $.get("/spa/" + encodeURIComponent(c), function(d) {
        var i = 0;
        d = $('#page-body span.postdetails b a, #main-content .search .postbody h2.h3 a, #main-content .posthead h2 a, #main-content .postbody-head h3 a, #wrap .page-header ~ .block .block-content > h2 > a', d).filter(function() { return /^\/t[1-9][0-9]*(p[1-9][0-9]*)?-[^#]*#[1-9][0-9]*$/.test($(this).attr("href")) }).each(function() {
            if (b === 9E15) { if (!confirm('Confirme para excluir ' + ($('h1:first', d).text().match(/[0-9]+/) || ["???"])[0] + ' mensagem de ' + c)) return b = 0, !1 }
            var a = +$(this).attr("href").substr($(this).attr("href").indexOf("#") + 1);
            if (a > b) { return b = 0, !1 }
            i++;
            b = a;
            var x = b;
            setTimeout(function() {
                $.post("/post", "p=" + x + "&mode=delete&confirm=1");
                num_deleted_cur++;
                document.title = num_deleted_prev + " (" + num_deleted_cur + "?/" + d + ")"
            }, 1000 * i)
        }).length;
        if (b != 0) {
            num_deleted_prev += num_deleted_cur;
            num_deleted_cur = 0;
            document.title = num_deleted_prev + " (" + num_deleted_cur + "/" + d + ")"
        } else { document.title = num_deleted_prev + " (erreur " + num_deleted_cur + "?)" }
        a += d;
        b ? 0 == d ? 0 == a ? alert("Nenhuma mensagem para excluir.") : alert(a + " mensagens" + (1 < a ? "s" : "") + " de " + c + " foram deletadas." + (1 < a ? "s" : "")) : setTimeout(function() { killall(c, a, b) }, 2000 + d * 1000) : alert("N\u00e3o foi possível excluir uma mensagem.")
    })
};