BUILD_DIR := ./build

all: $(BUILD_DIR) $(BUILD_DIR)/tcp_server $(BUILD_DIR)/tcp_client $(BUILD_DIR)/udp_server $(BUILD_DIR)/udp_client

$(BUILD_DIR):
	mkdir $(BUILD_DIR)

$(BUILD_DIR)/tcp_server: tcp_server.c
	gcc tcp_server.c -o $(BUILD_DIR)/tcp_server

$(BUILD_DIR)/tcp_client: tcp_client.c
	gcc tcp_client.c -o $(BUILD_DIR)/tcp_client

$(BUILD_DIR)/udp_server: udp_server.c
	gcc udp_server.c -o $(BUILD_DIR)/udp_server

$(BUILD_DIR)/udp_client: udp_client.c
	gcc udp_client.c -o $(BUILD_DIR)/udp_client

tcp_server.c:
	echo "no tcp_server.c file"

tcp_client.c:
	echo "no tcp_client.c file"

udp_server.c:
	echo "no udp_server.c file"

udp_client.c:
	echo "no udp_client.c file"

.PHONY: clean
clean:
	rm -r $(BUILD_DIR)
