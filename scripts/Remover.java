import javafx.application.*;
import javafx.stage.*;
import javafx.scene.*;
import javafx.scene.layout.*;
import javafx.scene.control.*;
import javafx.geometry.Pos;
import javafx.scene.control.Alert.*;
import java.io.*;
import java.util.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import javafx.stage.DirectoryChooser;
import static java.nio.file.StandardCopyOption.*;


public class Remover extends Application {
int totalFiles;
int totalLonelyPhotos;
String workingFolder;
// String workingFolder = System.getProperty("user.dir");
// File folder = new File(workingFolder);
File folder;
Label labelTotal;
Label labelLonely;
File[] listOfFiles;
VBox content;
HBox hcontent;
Scene scene;
Map<String, String> map = new HashMap<String, String>();


    public static void main(String[] args) {
        launch(args);
    }
    private void refreshLabel() {
    	content.getChildren().clear();
    	getFirstRun();
    	labelTotal = new Label("此目录下总文件数为：" + totalFiles);
    	labelLonely = new Label("此目录下落单的照片总数为：" + totalLonelyPhotos);
    	content.getChildren().add(labelTotal);
        content.getChildren().add(labelLonely);
        content.getChildren().add(hcontent);
    }

    public void getFirstRun() {
    	listOfFiles = folder.listFiles();
    	totalFiles = 0;
    	totalLonelyPhotos = 0;
    	// System.out.println("--- Gathering files: ---");
	    for (int i = 0; i < listOfFiles.length; i++) {
	      if (listOfFiles[i].isFile()) {
	      	totalFiles++;
	      	String fileFullName = listOfFiles[i].getName();
	        int lastIndexDot = fileFullName.lastIndexOf('.');
	        if (lastIndexDot >= 1) {
	        String fileName = listOfFiles[i].getName().substring(0, lastIndexDot);
	        if (map.get(fileName) != null && !map.get(fileName).equals("RRfalse")) {
	        	map.put(fileName, "RRfalse");
	        } else {
	        	map.put(fileName, listOfFiles[i].getName().substring(listOfFiles[i].getName().length() - 4));
	        }

	        }
	      } else if (listOfFiles[i].isDirectory()) {
	        // System.out.println("Skipping folders within this folder.");
	      }
	    }

	    // System.out.println("--- Debug info: ---");
	    for (String key : map.keySet()) {
	    	if (!map.get(key).equals("RRfalse")) {
	    		totalLonelyPhotos++;
	    	}
	    }

    }
    @Override
    public void start(Stage window) {
    	final DirectoryChooser fileChooser = new DirectoryChooser();
    	File file = fileChooser.showDialog(window);
    	// System.out.println(file);
        if (file != null) {
            try {
            	workingFolder = file.getAbsolutePath();
            	folder = new File(workingFolder);
            	listOfFiles = folder.listFiles();
            	// System.out.println("fdsaf");
            	// System.out.println(file);
            } catch (Throwable mistake) {
                // System.out.println(mistake);
            }
        }

    	getFirstRun();
    	labelTotal = new Label("此目录下总文件数为：" + totalFiles);
    	labelLonely = new Label("此目录下落单的照片总数为：" + totalLonelyPhotos);

        window.setTitle("落单照片管理器");


        Button btn = new Button("删除落单的照片");
        btn.setOnAction(e -> {
        	int removeValue = remove();
        	Alert alert = new Alert(AlertType.INFORMATION);
	        alert.setTitle("已删除落单的照片");
	        alert.setHeaderText(null);
	        alert.setContentText(removeValue + " 张落单的照片已被彻底移除。");
	        alert.showAndWait();
	        refreshLabel();
        }
        );

        Button btn2 = new Button("移走落单的照片");
        btn2.setOnAction(e -> {
        	int moveValue = move();
	        Alert alert2 = new Alert(AlertType.INFORMATION);
	        alert2.setTitle("已移走落单的照片");
	        alert2.setHeaderText(null);
	        alert2.setContentText(moveValue + " 张落单的照片已被移动至 Lonely_Photos 子文件夹下。");
	        alert2.showAndWait();
	        refreshLabel();
        });

        // Button btn3 = new Button("Click me");
        // btn3.setOnAction(e -> alert.showAndWait());

        // Button btn4 = new Button("Click me instead");
        // btn4.setOnAction(e -> alert2.showAndWait());

        // Button btn5 = new Button("Click me instead");
        // btn5.setOnAction(e -> alert2.showAndWait());

        // Button btn6 = new Button("Click me instead");
        // btn6.setOnAction(e -> alert2.showAndWait());

        hcontent = new HBox(20);
        hcontent.setAlignment(Pos.CENTER);
        hcontent.getChildren().add(btn2);
        hcontent.getChildren().add(btn);
        // hcontent.getChildren().add(btn5);
        // hcontent.getChildren().add(btn6);

        content = new VBox(20); // layout
        content.setAlignment(Pos.CENTER);
        content.getChildren().add(labelTotal);
        content.getChildren().add(labelLonely);
        content.getChildren().add(hcontent);

        scene = new Scene(content, 400, 200);
        window.setScene(scene);
        window.show();
    }

    public int remove() {
    	int removeAmount = 0;
	    // System.out.println("--- Removing files: ---");
	    for (String key : map.keySet()) {
	    	Path pathOfFile = Paths.get(workingFolder + "/" + key + map.get(key));
	    	File newFolder = new File(workingFolder + "/" + "Lonely_Photos/");
	    	newFolder.mkdir();
	    	Path pathToMove = Paths.get(workingFolder + "/" + "Lonely_Photos/" + key + map.get(key));
	    	if (! map.get(key).equals("RRfalse")) {
	    		// System.out.println("Removing: " + pathOfFile);
	    		try {
					Files.delete(pathOfFile);
					removeAmount++;
				} catch (Throwable e) {
					// System.out.println(e);
					// System.out.println("Removal of " + pathOfFile + " has failed.");
				}
	    	}
	    }
	    return removeAmount;
    }

    public int move() {
    	int moveAmount = 0;
	    // System.out.println("--- Removing files: ---");
	    for (String key : map.keySet()) {
	    	Path pathOfFile = Paths.get(workingFolder + "/" + key + map.get(key));
	    	File newFolder = new File(workingFolder + "/" + "Lonely_Photos/");
	    	newFolder.mkdir();
	    	Path pathToMove = Paths.get(workingFolder + "/" + "Lonely_Photos/" + key + map.get(key));
	    	if (! map.get(key).equals("RRfalse")) {
	    		// System.out.println("Removing: " + pathOfFile);
	    		try {
					// Files.delete(pathOfFile);
					Files.move(pathOfFile, pathToMove, REPLACE_EXISTING);
					moveAmount++;
				} catch (Throwable e) {
					// System.out.println(e);
					// System.out.println("Removal of " + pathOfFile + " has failed.");
				}
	    	}
	    }
	    return moveAmount;
    }

}