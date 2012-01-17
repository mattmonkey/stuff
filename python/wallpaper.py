#!/usr/bin/env python

import gobject
gobject.threads_init()
import gtk
import os
import xml.dom.minidom
import gconf

class Wallpaper:
    def __init__(self):
        # Create GTK Window
        self.window = gtk.Window(gtk.WINDOW_TOPLEVEL)
        self.window.set_title("Dynamic Wallpaper")
        self.window.resize(350, 110)
        self.window.set_resizable(False)
        
        # Create window objects
        vbox = gtk.VBox()

        label = gtk.Label("Folder:")
        label.set_alignment(0.0, 0.5)
        self.folder_entry = gtk.Entry()
        button = gtk.Button("Select...")
        button.connect("clicked", self.button_clicked)
        hbox = gtk.HBox()
        hbox.pack_start(label, True)
        hbox.pack_start(self.folder_entry, False)
        hbox.pack_start(button, False)
        vbox.pack_start(hbox, False)
        
        label = gtk.Label("Picture duration:")
        label.set_alignment(0.0, 0.5)
        adj = gtk.Adjustment(5.0, 1.0, 60.0, 1.0, 1.0, 0.0)
        self.pdur_spinner = gtk.SpinButton(adj)
        self.pdur_combo = gtk.combo_box_new_text()
        self.pdur_combo.append_text("hr")
        self.pdur_combo.append_text("min")
        self.pdur_combo.append_text("sec")
        self.pdur_combo.set_active(1)
        hbox = gtk.HBox()
        hbox.pack_start(label, True)
        hbox.pack_start(self.pdur_spinner, False)
        hbox.pack_start(self.pdur_combo, False)
        vbox.pack_start(hbox, False)
        
        label = gtk.Label("Transition duration:")
        label.set_alignment(0.0, 0.5)
        adj = gtk.Adjustment(5.0, 0.0, 60.0, 1.0, 1.0, 0.0)
        self.tdur_spinner = gtk.SpinButton(adj)
        self.tdur_combo = gtk.combo_box_new_text()
        self.tdur_combo.append_text("hr")
        self.tdur_combo.append_text("min")
        self.tdur_combo.append_text("sec")
        self.tdur_combo.set_active(2)
        hbox = gtk.HBox()
        hbox.pack_start(label, True)
        hbox.pack_start(self.tdur_spinner, False)
        hbox.pack_start(self.tdur_combo, False)
        vbox.pack_start(hbox, False)
        
        self.cancel_button = gtk.Button(stock=gtk.STOCK_CLOSE)
        self.cancel_button.connect("clicked", self.destroy)
        self.ok_button = gtk.Button(stock=gtk.STOCK_OK)
        self.ok_button.set_sensitive(False)
        self.ok_button.connect("clicked", self.ok_button_clicked)
        hbox = gtk.HBox()
        hbox.pack_end(self.ok_button, False)
        hbox.pack_end(self.cancel_button, False)
        vbox.pack_end(hbox, False, False, 10)

        # Connect signal handlers
        self.window.connect("delete-event", self.delete_event)
        self.window.connect("destroy", self.destroy)

        # Show entire window
        self.window.add(vbox)
        self.window.show_all()

    def destroy(self, widget):
        gtk.main_quit()
        
    def button_clicked(self, button):
        dialog = gtk.FileChooserDialog("Open..", None, gtk.FILE_CHOOSER_ACTION_SELECT_FOLDER,
                                       (gtk.STOCK_CANCEL, gtk.RESPONSE_CANCEL,
                                        gtk.STOCK_OK, gtk.RESPONSE_OK))
        dialog.set_default_response(gtk.RESPONSE_OK)
        dialog.set_filename(os.path.expanduser("~/Pictures/*"))
        response = dialog.run()
        filename = dialog.get_filename()
        dialog.destroy()

        if response == gtk.RESPONSE_OK:
            self.folder_entry.set_text(filename)
            self.files = []
            accepted = ('.jpg', '.jpeg', '.gif', '.png')
            for file in os.listdir(filename):
                if os.path.splitext(file)[1] in accepted:
                    self.files.append(os.path.join(filename, file))
            
            if len(self.files):
                self.ok_button.set_sensitive(True)
            else:
                dialog = gtk.MessageDialog(parent = None, flags = gtk.DIALOG_DESTROY_WITH_PARENT,
                    type = gtk.MESSAGE_ERROR, buttons = gtk.BUTTONS_OK,
                    message_format = "Folder contains no images")
                dialog.set_title('Error')
                dialog.connect('response', lambda dialog, response: dialog.destroy())
                dialog.run()
        
    def ok_button_clicked(self, button):
        nfiles = len(self.files)
        
        if nfiles <= 0:
            return False
        
        folder = self.folder_entry.get_text()

        picture_duration = int(self.pdur_spinner.get_text())
        if self.pdur_combo.get_active_text() == "min":
            picture_duration = picture_duration * 60
        elif self.pdur_combo.get_active_text() == "hr":
            picture_duration = picture_duration * 60 * 60
        
        transition_duration = int(self.tdur_spinner.get_text())
        if self.tdur_combo.get_active_text() == "min":
            transition_duration = transition_duration * 60
        elif self.tdur_combo.get_active_text() == "hr":
            transition_duration = transition_duration * 60 * 60
                
        document = """<background><starttime><year>2009</year><month>08</month><day>04</day><hour>00</hour><minute>00</minute><second>00</second></starttime></background>"""
        dom = xml.dom.minidom.parseString(document)
        
        for i in range(0, nfiles):
            static = dom.createElement("static")
            duration = dom.createElement("duration")
            duration.appendChild(dom.createTextNode(str(picture_duration)))
            static.appendChild(duration)
            file = dom.createElement("file")
            file.appendChild(dom.createTextNode(self.files[i]))
            static.appendChild(file)
            dom.documentElement.appendChild(static)

            if transition_duration <= 0: continue
 
            transition = dom.createElement("transition")
            duration = dom.createElement("duration")
            duration.appendChild(dom.createTextNode(str(transition_duration)))
            transition.appendChild(duration)
            frm = dom.createElement("from")
            frm.appendChild(dom.createTextNode(self.files[i]))
            transition.appendChild(frm)
            to = dom.createElement("to")
            if i < nfiles-1:
                to.appendChild(dom.createTextNode(self.files[i+1]))
            else:
                to.appendChild(dom.createTextNode(self.files[0]))
            transition.appendChild(to)
            dom.documentElement.appendChild(transition)
            
        try:
            save_filename = os.path.join(folder, "background-1.xml")
            f = open(save_filename, 'w')
            f.write(dom.toxml("utf-8"))
            f.close()
        except IOError as (errno, strerror):
            try:
                save_filename = os.path.join(os.path.expanduser("~"), ".dynamic-wallpaper.xml")
                f = open(save_filename, 'w')
                f.write(dom.toxml("utf-8"))
                f.close()
            except Error as (errno, strerror):
                dialog = gtk.MessageDialog(parent = None, flags = gtk.DIALOG_DESTROY_WITH_PARENT,
                    type = gtk.MESSAGE_ERROR, buttons = gtk.BUTTONS_OK,
                    message_format = strerror)
                dialog.set_title('Error')
                dialog.connect('response', lambda dialog, response: dialog.destroy())
                dialog.run()
                return False
        except Error as (errno, strerror):
                dialog = gtk.MessageDialog(parent = None, flags = gtk.DIALOG_DESTROY_WITH_PARENT,
                    type = gtk.MESSAGE_ERROR, buttons = gtk.BUTTONS_OK,
                    message_format = strerror)
                dialog.set_title('Error')
                dialog.connect('response', lambda dialog, response: dialog.destroy())
                dialog.run()
                return False
        
        backgrounds_file = os.path.join(os.path.expanduser("~/.gnome2/"), "backgrounds.xml")
        doc = xml.dom.minidom.parse(backgrounds_file)
        
        wallpaper = dom.createElement("wallpaper")
        wallpaper.setAttribute("deleted", "false")
        name = dom.createElement("name")
        name.appendChild(dom.createTextNode("Dynamic Wallpaper"))
        filename = dom.createElement("filename")
        filename.appendChild(dom.createTextNode(save_filename))
        options = dom.createElement("options")
        options.appendChild(dom.createTextNode("stretched"))
        shade_type = dom.createElement("shade_type")
        shade_type.appendChild(dom.createTextNode("solid"))
        pcolor = dom.createElement("pcolor")
        pcolor.appendChild(dom.createTextNode("#2c2c00001e1e"))
        scolor = dom.createElement("scolor")
        scolor.appendChild(dom.createTextNode("#2c2c00001e1e"))
        wallpaper.appendChild(name)
        wallpaper.appendChild(filename)
        wallpaper.appendChild(options)
        wallpaper.appendChild(shade_type)
        wallpaper.appendChild(pcolor)
        wallpaper.appendChild(scolor)
        doc.documentElement.appendChild(wallpaper)

        try:
            f = open(backgrounds_file, 'w')
            f.write(doc.toxml("utf-8"))
            f.close()
        except Error as (errno, strerror):
                dialog = gtk.MessageDialog(parent = None, flags = gtk.DIALOG_DESTROY_WITH_PARENT,
                    type = gtk.MESSAGE_ERROR, buttons = gtk.BUTTONS_OK,
                    message_format = strerror)
                dialog.set_title('Error')
                dialog.connect('response', lambda dialog, response: dialog.destroy())
                dialog.run()
                return False
        
        conf_client = gconf.client_get_default()
        conf_client.add_dir("/desktop/gnome/background", gconf.CLIENT_PRELOAD_NONE)
        conf_client.set_string("/desktop/gnome/background/picture_filename", save_filename)
        conf_client.set_string("/desktop/gnome/background/picture_options", "strecthed")
        conf_client.set_string("/desktop/gnome/background/color_shading_type", "solid")
        conf_client.set_string("/desktop/gnome/background/primary_color", "#2c2c00001e1e")
        conf_client.set_string("/desktop/gnome/background/secondary_color", "#2c2c00001e1e")

        gtk.main_quit()

    def delete_event(self, widget, event):
        return False

if __name__ == "__main__":
    wallpaper = Wallpaper()
    gtk.main()
