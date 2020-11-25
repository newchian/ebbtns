package com.xca.chat.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;

public class ChatService {
	private Properties userList;
	// 读取系统用户信息
	private Properties loadUser() throws IOException {
		if (userList == null) {
			// 加载userFile.properties文件
			File f = new File("userFile.properties");
			// 如果文件不存在，新建该文件
			if (f.exists()) {
				f.createNewFile();
			}
			// 新建Properties文件
			userList = new Properties();
			// 读取userFile.properties文件里的用户信息
			userList.load(new FileInputStream(f));
		}
		return userList;
	}
	// 保存系统所有用户
	private boolean saveUserList() throws IOException {
		if (userList == null) {
			return false;
		}
		// 将userList信息保存到Properties文件中
		userList.store(new FileOutputStream("userFile.properties"), "Users Info List");
		return true;
	}

}
