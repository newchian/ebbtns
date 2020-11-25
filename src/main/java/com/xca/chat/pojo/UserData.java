package com.xca.chat.pojo;

import java.util.HashMap;
import java.util.Map;

public class UserData {
	public static final Map<Long, User> USER_MAP = new HashMap<>();
	static {
		USER_MAP.put(1001L, User.builder().id(1001L).userName("Tom1世").build());
		USER_MAP.put(1002L, User.builder().id(1002L).userName("Tom2世").build());
		USER_MAP.put(1003L, User.builder().id(1003L).userName("Tom3世").build());
		USER_MAP.put(1004L, User.builder().id(1004L).userName("Tom4世").build());
		USER_MAP.put(1005L, User.builder().id(1005L).userName("Tom5世").build());
	}
}
