/**
 * SticksApplet.java
 * @author jorgeluismireles at yahoo.com
 * @version 2002/04/03

    2019:
        javac SticksApplet.java
        appletviewer Sticks.html

 */
import java.applet.Applet;
import java.awt.*;
import java.awt.event.*;
import java.util.*;

public class SticksApplet extends Applet implements Runnable, ItemListener
{
    private Hashtable models = new Hashtable();
    private Hashtable table = new Hashtable();
    private Vector vector = new Vector();
    private Thread thread;
    
    private int minAngle;
    private int maxAngle;
    private String moveablePointName = null;
    
    private Choice modelsChoice;
    
    public void changeData(String data) {
        if (thread != null && thread.isAlive()) {
            thread.stop();
            thread = null;
        }
        vector.removeAllElements();
        table.clear();
        StringTokenizer st = new StringTokenizer(data);
        while (st.hasMoreTokens()) {
            String key = st.nextToken();
            String type = st.nextToken();
            StickPoint p = new StickPoint();
            if (type.equals("F")) { // FIXED TYPE
                int x = Integer.parseInt(st.nextToken());
                int y = Integer.parseInt(st.nextToken());
                p.setFixed(x, y, st.nextToken());
            } else if (type.equals("M")) { // MOVEABLE TYPE
                int angle = Integer.parseInt(st.nextToken());
                minAngle = Integer.parseInt(st.nextToken());
                maxAngle = Integer.parseInt(st.nextToken());
                moveablePointName = key;
                p.setRotable(angle, st.nextToken());
            } else if (type.equals("A")) {
                int angle = Integer.parseInt(st.nextToken());
                p.setRotable(angle, st.nextToken());
            } else {
                p.setMoveable(type, st.nextToken(), st.nextToken());
            }
            vector.addElement(p);
            table.put(key, p);
        }
        Enumeration e = vector.elements();
        while (e.hasMoreElements()) {
            StickPoint p = (StickPoint)e.nextElement();
            String point1 = p.point1;
            String point2 = p.point2;
            if (p.point1 != null)
                p.p1 = (StickPoint)table.get(point1);
            if (p.point2 != null)
                p.p2 = (StickPoint)table.get(point2);
        }
        thread = new Thread(this);
        thread.start();
    }
    
    public void init() {
        modelsChoice = new Choice();
        modelsChoice.addItemListener(this);
        add(modelsChoice);
        setBackground(new Color(0xff, 0xff, 0xff));

        for (int i=1; true; i++) {
            String values = getParameter(String.valueOf(i));
            if (values == null) {
                return;
            } else {
                StringTokenizer st = new StringTokenizer(values, ":");
                String name = st.nextToken();
                String data = st.nextToken();
                if (models == null)
                    models = new Hashtable();
                models.put(name, data);
                modelsChoice.addItem(name);
            }
        }
        
    }
    
    public void start() {
        thread = new Thread(this);
        changeData((String)models.get(modelsChoice.getSelectedItem()));
    }

    public void stop() {
        if (thread != null && thread.isAlive())
            thread.stop();
    }

    public void run() {
        boolean up = true;
        if (moveablePointName == null || !table.containsKey(moveablePointName)) {
            repaint();
            return;
        }
        StickPoint p = (StickPoint)table.get(moveablePointName);
       
        // animate...
        while (true) {
            try { Thread.sleep(3); }
            catch (InterruptedException e) { }
            if (p != null) {
                if (p.angle < maxAngle && up)
                    p.angle += 0.05;
                else
                    up = false;
                if (p.angle > minAngle && !up)
                    p.angle -= 0.05;
                else
                    up = true;
            }
            repaint();
        }
    }
    
    public void itemStateChanged(ItemEvent evt) {
        String selected = modelsChoice.getSelectedItem();
        String data = (String)models.get(selected);
        changeData(data);
    }
    
    Image offscreen;
    Dimension offscreensize;
    Graphics hidden;

    public synchronized void update(Graphics g) {
        Dimension d = size();
        if ((offscreen == null) || (d.width != offscreensize.width) ||
            (d.height != offscreensize.height)) 
        {
            offscreen = createImage(d.width, d.height);
            offscreensize = d;
            hidden = offscreen.getGraphics();
        }
        hidden.setColor(getBackground());
        hidden.fillRect(0, 0, d.width, d.height);
        hidden.setColor(Color.blue);
        if (paint_(hidden))
            g.drawImage(offscreen, 0, 0, null);
    }

    public boolean paint_(Graphics g) {
        Enumeration e = vector.elements();
        while (e.hasMoreElements()) {
            StickPoint p = (StickPoint)e.nextElement();
            if (p.type.equals("F")) {
                p.drawStick(p.p1, g);
            } else if (p.type.equals("M")) {
                p.setNewAngle();
                p.drawStick(p.p1, g);
            } else {
                if (p.intersects()) {
                    p.drawStick(p.p1, g);
                    p.drawStick(p.p2, g);
                } else {
                    return false; // excess
                }
            }
        }
        return true;
    }
}

                
