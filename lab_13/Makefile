BUILD_DIR := ./build
SRC_DIR := .

all: $(BUILD_DIR) $(BUILD_DIR)/tcp_server $(BUILD_DIR)/tcp_client $(BUILD_DIR)/udp_server $(BUILD_DIR)/udp_client

$(BUILD_DIR):
	mkdir $(BUILD_DIR)

$(BUILD_DIR)/tcp_server: $(SRC_DIR)/tcp_server.c
	gcc $(SRC_DIR)/tcp_server.c -o $(BUILD_DIR)/tcp_server

$(BUILD_DIR)/tcp_client: $(SRC_DIR)/tcp_client.c
	gcc $(SRC_DIR)/tcp_client.c -o $(BUILD_DIR)/tcp_client

$(BUILD_DIR)/udp_server: $(SRC_DIR)/udp_server.c
	gcc $(SRC_DIR)/udp_server.c -o $(BUILD_DIR)/udp_server

$(BUILD_DIR)/udp_client: $(SRC_DIR)/udp_client.c
	gcc $(SRC_DIR)/udp_client.c -o $(BUILD_DIR)/udp_client

$(SRC_DIR)/tcp_server.c:
	echo "no $(SRC_DIR)/tcp_server file"

$(SRC_DIR)/tcp_client.c:
	echo "no $(SRC_DIR)/tcp_client file"

$(SRC_DIR)/udp_server.c:
	echo "no $(SRC_DIR)/udp_server file"

$(SRC_DIR)/udp_client.c:
	echo "no $(SRC_DIR)/udp_client file"

.PHONY: clean
clean:
	rm -r $(BUILD_DIR)

rebuild: clean all
