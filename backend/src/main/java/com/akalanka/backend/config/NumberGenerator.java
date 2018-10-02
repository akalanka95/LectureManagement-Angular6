package com.akalanka.backend.config;

import java.util.Optional;
import java.util.UUID;

public class NumberGenerator {

    public static String NumberGenerators(){
        return "LCR" + UUID.randomUUID().toString().substring(26).toUpperCase();

    }
    public static Optional<String> getExtensionByStringHandling(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }

}
