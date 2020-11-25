package lianshou;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.Random;
import java.util.Set;
import java.util.TreeSet;
import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import org.junit.Test;

import junit.framework.Assert;

public class StreamsTest {
	@Test
	public void peek() throws Exception {
		FileToWords.stream("src/test/java/lianshou/Cheese.dat").skip(21).limit(4).map(w -> w + " ").peek(System.out::print)
				.map(String::toUpperCase).peek(System.out::print)
		/*
		 * .map(String::toLowerCase) .forEach(System.out::print)
		 */;
		/*
		 * Stream.of("one", "two", "three", "four") .filter(e -> e.length() > 3)
		 * .peek(e -> System.out.println("Filtered value: " + e))
		 * .map(String::toUpperCase) .peek(e -> System.out.println("Mapped value: "
		 * + e)) .collect(Collectors.toList());
		 */

	}

	@Test
	public void streamOfStreams() {
		Stream.of(1, 2, 3).map(i -> Stream.of("Gonzo", "Kermit", "Beaker")).map(e -> e.getClass().getName())
				.forEach(System.out::println);
	}

	@Test
	public void flatMap() {
		Stream.of(1, 2, 3).flatMap(i -> Stream.of("Gonzo", "Fozzie", "Beaker")).forEach(System.out::println);
	}

	@Test
	public void streamOfRandoms() {
		final Random rand = new Random(47);
		Stream.of(1, 2, 3, 4, 5).flatMapToInt(i -> IntStream.concat(rand.ints(0, 100).limit(i), IntStream.of(-1)))
				.forEach(n -> System.out.format("%d ", n));
	}

	@Test
	public void fileToWords() throws Exception {
		FileToWords.stream("src/test/java/lianshou/Cheese.dat").limit(7).forEach(s -> System.out.format("%s ", s));
		System.out.println();
		FileToWords.stream("src/test/java/lianshou/Cheese.dat").skip(7).limit(2).forEach(s -> System.out.format("%s ", s));
	}

	@Test
	public void otionalsFromEmptyStreams() {
		System.out.println(Stream.<String>empty().findFirst());
		System.out.println(Stream.<String>empty().findAny());
		System.out.println(Stream.<String>empty().max(String.CASE_INSENSITIVE_ORDER));
		System.out.println(Stream.<String>empty().min(String.CASE_INSENSITIVE_ORDER));
		System.out.println(Stream.<String>empty().reduce((s1, s2) -> s1 + s2));
		System.out.println(IntStream.empty().average());
	}

	@Test
	public void optionalBasics() {
		test(Stream.of("Epithets").findFirst());
		test(Stream.<String>empty().findFirst());
	}

	@Test
	public void optionals() {
		test("basics", StreamsTest::basics);
		test("ifPresent", StreamsTest::ifPresent);
		test("orElse", StreamsTest::orElse);
		test("orElseGet", StreamsTest::orElseGet);
		test("orElseThrow", StreamsTest::orElseThrow);
	}
	@Test
	public void creatingOptionals() {
		test("empty", Optional.empty());
    test("of", Optional.of("Howdy"));
    try {
      test("of", Optional.of(null));
    }catch(Exception e) {
      System.out.println(e);
    }
    test("ofNullable", Optional.ofNullable("Hi"));
    test("ofNullable", Optional.ofNullable(null));
	}
	@Test
	public void optionalFilter() {
		optionalTest("true", str -> true);
		optionalTest("false", str -> false);
		optionalTest("str != \"\"", str -> str != "");
		optionalTest("str.length() == 3", str -> str.length() == 3);
		optionalTest("startsWith(\"B\")", str -> str.startsWith("B"));
	}
	@Test
	public void optionalMap() {
		ptionalMapTest("Add brackets", s-> "[" + s + "]");
		ptionalMapTest("Increment", s-> {
      try{
        return Integer.parseInt(s) + 1 + "";
      }catch(NumberFormatException e) {
        return s;
      }
    });
		ptionalMapTest("Replace", s-> s.replace("2", "9"));
		ptionalMapTest("Take last digit", s-> s.length() > 0 ? s.charAt(s.length() - 1) + "" : s);
	}
	@Test
	public void streamOfOptionals() {
		Signal.stream()
				.limit(10)
				.forEach(System.out::println);
		System.out.println(" ---");
		Signal.stream()
				.limit(10)
				.filter(Optional::isPresent)
				.map(Optional::get)
				.forEach(System.out::println);
	}
	@Test
	public void forEach() {
		final int SZ = 14;
		rands().limit(SZ).forEach(n -> System.out.format("%d ", n));
    System.out.println();
    rands().limit(SZ)
      .parallel()
      .forEach(n -> System.out.format("%d ", n));
    System.out.println();
    rands().limit(SZ)
      .forEachOrdered(n -> System.out.format("%d ", n));
    System.out.println();
    rands().limit(SZ)
      .parallel()
      .forEachOrdered(n -> System.out.format("%d ", n));    
	}
	@Test
	public void treeSetOfWords() throws IOException {
		Set<String> words2 =
	      Files.lines(Paths.get("src/test/java/lianshou/StreamsTest.java"))
	        .flatMap(s-> Arrays.stream(s.split("\\W+")))
	        .filter(s-> !s.matches("\\d+")) // No numbers
	        .map(String::trim)
	        .filter(s -> s.length() > 2)
	        .limit(1000)
	        .collect(Collectors.toCollection(TreeSet::new));
	  System.out.println(words2);
	}
	@Test
	public void mapCollector() {
		Map<Integer, Character> map =
	      new RandomPair().stream()
	      .limit(8)
	      .collect(Collectors.toMap(Pair::getI, Pair::getC));
	  System.out.println(map);
	}
	void test(Optional<String> optString) {
		basics(optString);
	}
	@Test
	public void specialCollector() throws Exception {
    ArrayList<String> words =
        FileToWords.stream("src/test/java/lianshou/Cheese.dat")
          .collect(ArrayList::new,
                   ArrayList::add,
                   ArrayList::addAll);
    words.stream()
         .filter(s -> s.equals("cheese"))
         .forEach(System.out::println);		
	}
	@Test
	public void reduce() {
    Stream.generate(Frobnitz::supply)
				.limit(10).peek(System.out::println).reduce((fr0, fr1) -> fr0.size < 50 ? fr0 : fr1)
				.ifPresent(System.out::println);
	}
	@Test
	public void reduce2() {
    Stream.generate(Frobnitz::supply)
				.limit(10).reduce((fr0, fr1) -> fr0.size < 50 ? fr0 : fr1)
				.ifPresent(System.out::println);
	}
	@Test
	public void reduce3() {
		Optional optional = Stream.of(66,88,30,99,52,42)
				.reduce((fr0, fr1) -> fr0 < 50 ? fr0 : fr1);
		Assert.assertEquals(30, optional.get());;
	}
	/*@Test
	public void peek2() {
		Stream.of("one", "two", "three", "four")
    .filter(e -> e.length() > 3)
    .peek(e -> System.out.println("Filtered value: " + e))
    .map(String::toUpperCase)
    .peek(e -> System.out.println("Mapped value: " + e))
    .collect(Collectors.toList());
	}*/
	@Test
	public void matching() {
		show(Stream::allMatch, 10);
    show(Stream::allMatch, 4);
    show(Stream::anyMatch, 2);
    show(Stream::anyMatch, 0);
    show(Stream::noneMatch, 5);
    show(Stream::noneMatch, 0);
	}
	@Test
	public void selectElement() {
		System.out.println(RandInts.rands().findFirst().getAsInt());
    System.out.println(
    	RandInts.rands().parallel().findFirst().getAsInt());
    System.out.println(RandInts.rands().findAny().getAsInt());
    System.out.println(
    	RandInts.rands().parallel().findAny().getAsInt());
	}
	@Test
	public void lastElement() {
		OptionalInt last = IntStream.range(10, 20)
	      .reduce((n1, n2) -> n2);
	    System.out.println(last.orElse(-1));
	    // Non-numeric object:
	    Optional<String> lastobj =
	      Stream.of("one", "two", "three")
	        .reduce((n1, n2) -> n2);
	    System.out.println(
	      lastobj.orElse("Nothing there!"));
	}
	@Test
	public void informational() throws Exception {
		System.out.println(
        FileToWords.stream("src/test/java/lianshou/Cheese.dat").count());
		System.out.println(
				FileToWords.stream("src/test/java/lianshou/Cheese.dat").min(String.CASE_INSENSITIVE_ORDER).orElse("NONE"));
		System.out.println(
				FileToWords.stream("src/test/java/lianshou/Cheese.dat")
                .max(String.CASE_INSENSITIVE_ORDER)
                .orElse("NONE"));
	}
	@Test
	public void numericStreamInfo() {
		System.out.println(rands().average().getAsDouble());
    System.out.println(rands().max().getAsInt());
    System.out.println(rands().min().getAsInt());
    System.out.println(rands().sum());
    System.out.println(rands().summaryStatistics());
	}
	static void basics(Optional<String> optString) {
		if (optString.isPresent())
			System.out.println(optString.get());
		else
			System.out.println("Nothing inside!");
	}

	static void ifPresent(Optional<String> optString) {
		optString.ifPresent(System.out::println);
	}

	static void orElse(Optional<String> optString) {
		System.out.println(optString.orElse("Nada"));
	}

	static void orElseGet(Optional<String> optString) {
		System.out.println(optString.orElseGet(() -> "Generated"));
	}

	static void orElseThrow(Optional<String> optString) {
		try {
			System.out.println(optString.orElseThrow(() -> new Exception("Supplied")));
		} catch (Exception e) {
			System.out.println("Caught " + e);
		}
	}

	private void test(String testName, Consumer<Optional<String>> cos) {
		System.out.println(" === " + testName + " === ");
		cos.accept(Stream.of("Epithets").findFirst());
		cos.accept(Stream.<String>empty().findFirst());
	}

	void test(String testName, Optional<String> opt) {
		System.out.println(" === " + testName + " === ");
		System.out.println(opt.orElse("Null"));
	}

	final String[] elements = { "Foo", "", "Bar", "Baz", "Bingo" };

	Stream<String> testStream() {
		return arraysStream(elements);
	}

	private Stream<String> arraysStream(String[] elements) {
		return Arrays.stream(elements);
	}

	void optionalTest(String descr, Predicate<String> pred) {
		System.out.println(" ---( " + descr + " )---");
		for (int i = 0; i <= elements.length; i++) {
			System.out.println(testStream()
					.skip(i)
					.findFirst()
					.filter(pred));
		}
	}
  String[] ptionalMapElements = {"12", "", "23", "45"};
  Stream<String> ptionalMapTestStream() {
    return Arrays.stream(ptionalMapElements);
  }

	void ptionalMapTest(String descr, Function<String, String> func) {
		System.out.println(" ---( " + descr + " )---");
		for (int i = 0; i <= ptionalMapElements.length; i++) {
			System.out.println(ptionalMapTestStream()
					.skip(i)
					.findFirst()
					.map(func));
		}
	}
	static class FileToWords {
		public static Stream<String> stream(String filePath) throws Exception {
			return Files.lines(Paths.get(filePath)).skip(1) // First (comment) line
					.flatMap(line -> Pattern.compile("\\W+").splitAsStream(line));
		}
	}
	static class Signal {
	  private final String msg;
	  public Signal(String msg) { this.msg = msg; }
	  public String getMsg() { return msg; }
	  @Override
	  public String toString() {
	    return "Signal(" + msg + ")";
	  }
	  static final Random rand = new Random(47);
	  public static Signal morse() {
	    switch(rand.nextInt(4)) {
	      case 1: return new Signal("dot");
	      case 2: return new Signal("dash");
	      default: return null;
	    }
	  }
	  public static Stream<Optional<Signal>> stream() {
	    return Stream.generate(Signal::morse).map(signal -> Optional.ofNullable(signal));
	  }
	}
	static int[] rints = new Random(47).ints(0, 1000).limit(100).toArray();
	static IntStream rands() {
	  return Arrays.stream(rints);
	}
	class Pair {
	  public final Character c;
	  public final Integer i;
	  Pair(Character c, Integer i) {
	    this.c = c;
	    this.i = i;
	  }
	  public Character getC() { return c; }
	  public Integer getI() { return i; }
	  @Override
	  public String toString() {
	    return "Pair(" + c + ", " + i + ")";
	  }
	}
	class RandomPair {
	  Random rand = new Random(47);
	  // An infinite iterator of random capital letters:
	  Iterator<Character> capChars = rand.ints(65,91)
	    .mapToObj(i-> (char)i)
	    .iterator();
	  public Stream<Pair> stream() {
	    return rand.ints(100, 1000).distinct()
	      .mapToObj(i-> new Pair(capChars.next(), i));
	  }
	}
	static class Frobnitz {
	  int size;
	  Frobnitz(int sz) { size = sz; }
	  @Override
	  public String toString() {
	    return "Frobnitz(" + size + ")";
	  }
	  // Generator:
	  static Random rand = new Random(47);
	  static final int BOUND = 100;
	  static Frobnitz supply() {
	    return new Frobnitz(rand.nextInt(BOUND));
	  }
	}
	interface Matcher extends BiPredicate<Stream<Integer>, Predicate<Integer>> {}
	static void show(Matcher match, int val) {
    System.out.println(
      match.test(
        IntStream.rangeClosed(1, 9)
          .boxed()
          .peek(n -> System.out.format("%d ", n)),
        n -> n < val));
  }
	public static class RandInts {
	  private static int[] rints =
	    new Random(47).ints(0, 1000).limit(100).toArray();
	  public static IntStream rands() {
	    return Arrays.stream(rints);
	  }
	}
}
