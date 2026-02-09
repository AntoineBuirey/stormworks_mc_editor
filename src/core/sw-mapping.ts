export const BLOCK_IDS = {
    // Nodes (handled separately)
    'input_number': 0,
    'input_bool': 0,
    'output_bool': 0,
    
    // Arithmetic components
    'math_abs': 14,
    'math_add': 6,
    'math_clamp': 11,
    'constant_number': 15,
    'math_delta': 35,
    'math_divide': 9,
    'math_equal': 42,
    'math_function_1': 45,         // f(x)
    'math_function_3': 10,         // f(x, y, z)
    'math_function_8': 36,         // f(x, y, z, w, a, b, c, d)
    'math_modulo': 38,
    'math_multiply': 8,
    'math_subtract': 7,
    
    // Logical components
    'logic_and': 1,
    'logic_bool_function_4': 46,   // Boolean f(x,y,z,w)
    'logic_bool_function_8': 47,   // Boolean f(x,y,z,w,a,b,c,d)
    'constant_on': 16,             // Constant On Signal
    'constant_bool': 16,           // Backwards-compat alias
    'logic_jk_flip_flop': 25,
    'logic_nand': 4,
    'logic_nor': 5,
    'logic_not': 21,
    'logic_or': 2,
    'logic_pulse': 48,             // Pulse (Toggle to Push)
    'logic_push_to_toggle': 28,
    'logic_sr_latch': 24,
    'logic_xor': 3,
    
    // Control components
    'control_blinker': 27,
    'control_capacitor': 26,
    'logic_greater': 17,           // Greater Than
    'logic_less': 18,              // Less Than
    'control_memory': 13,          // Memory Register
    'control_num_junction': 21,    // Numerical Junction
    'control_num_switchbox': 22,   // Numerical Switchbox
    'control_pid': 23,
    'control_pid_advanced': 39,
    'control_threshold': 12,
    'control_timer_rtf': 52,
    'control_timer_rto': 51,
    'control_timer_tof': 50,
    'control_timer_ton': 49,
    'control_counter': 37,         // Up/Down Counter
    
    // Composite components
    'composite_audio_switchbox': 59,
    'composite_binary_to_number': 55,
    'composite_read_number': 31,
    'composite_read_bool': 29,
    'composite_switchbox': 53,
    'composite_write_number': 40,
    'composite_write_bool': 41,
    'composite_lua': 56,
    'composite_number_to_binary': 54,
    'composite_video_switchbox': 57,
    
    // Property components
    'property_dropdown': 20,
    'property_number': 34,
    'property_slider': 19,
    'property_text': 58,
    'property_toggle': 33,
    'property_tooltip_number': 43,
    'property_tooltip_bool': 44,
};