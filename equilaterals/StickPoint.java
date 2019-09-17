import java.util.*;
import java.applet.*;
import java.awt.*;

/**
 * Stores each point of the articulated sticks system.
 * Each point joins two or more sticks. There are points fixed and moveable.
 */
public class StickPoint
{
    String type;
    String point1 = null;
    String point2 = null;

    StickPoint p1 = null;
    StickPoint p2 = null;

    double x;
    double y;
    double angle;
    
    public void setFixed(double x, double y, String point) {
        this.type = "F";
        this.x = x;
        this.y = y;
        this.point1 = point;
    }
    
    public void setRotable(int angle, String point) {
        this.type = "M";
        this.angle = angle;
        this.point1 = point;
    }
    
    public void setMoveable(String type, String point1, String point2) {
        this.type = type;
        this.point1 = point1;
        this.point2 = point2;
    }

    /**
     * Join this StickPoint with another given to form a stick.
     * Marks this point with a little dot if is moveable.
     */
    public void drawStick(StickPoint p, Graphics g) {
        int f = 60;
        g.drawLine((int)(this.x*f+f), (int)(this.y*f+f), (int)(p.x*f+f), (int)(p.y*f+f));
        if (type.equals("M"))
            g.drawOval((int)(this.x*f+f-3), (int)(this.y*f+f-3), 6, 6);
    }
    
    /**
     * By the new angle, there are changed x, y coordinates related to M points.
     */
    public void setNewAngle() {
        x = Math.cos(angle*Math.PI/180) + p1.x;
        y = Math.sin(angle*Math.PI/180) + p1.y;
    }
     
    /**
     * Determines it this stick point exists, that is, if the the two sticks
     * defining this point are close enough to be joined...
     * This method try to set this.x and this.y as the coordinates of intersection
     * using calculation of two unit circles (two sticks radii). In order to simplify
     * first stick has its center at (x, y), while the other has its center at the
     * origin (0, 0).
     * The type parameter is taken in count this way:
     * F means this point is fixed. M means can be moved between two angles by an
     * external thread. There rest are the preferred point (since two circles has
     * two possible intersections)
     * N means prefers northest
     * E means prefers eastest
     * W means prefers westest
     * S means prefers southest
     */
    public boolean intersects() {
        /* Coordinates transformation for origin intersection */
        double X = p1.x - p2.x;
        double Y = p1.y - p2.y;
        double R = 1;
        
        /* Figure out two unit circles' intesections */
        double o = X*X + Y*Y;
        double i = o + 1 - R*R;

        double a = 4*o;
        double b = -4*Y*i;
        double c = i*i - 4*X*X;
        double m = b*b - 4*a*c;

        if (m < 0) {
            /* There is no intersection (m squared is an imaginary number) */
            return false;
        } else {
            double x1, y1, x2, y2;
            if (X != 0.0) {
                // First intersection
                y1 = (-b + Math.sqrt(m)) / (2*a);
                x1 = i/(2*X) - Y*y1/X;
                // Second intersection
                y2 = (-b - Math.sqrt(m)) / (2*a);
                x2 = i/(2*X) - Y*y2/X;
            } else {
                // This is the classical lazy programmer solution
                // for the not-a-number result problem...
                x1 = Math.sqrt(3) / 2; 
                x2 = - x1;
                y1 = y2 = Y / 2;
            }

            if (this.type.equals("N")) {
                this.x = (y1 < y2) ? x1 : x2;
                this.y = (y1 < y2) ? y1 : y2;
            } else if (this.type.equals("S")) {
                this.x = (y1 > y2) ? x1 : x2;
                this.y = (y1 > y2) ? y1 : y2;
            } else if (this.type.equals("W")) {
                this.x = (x1 < x2) ? x1 : x2;
                this.y = (x1 < x2) ? y1 : y2;
            } else if (this.type.equals("E")) {
                this.x = (x1 > x2) ? x1 : x2;
                this.y = (x1 > x2) ? y1 : y2;
            }
            // returns offset (used for origin simplification)
            this.x += p2.x;
            this.y += p2.y;
            return true;
        }
    }
}
     
 

