package lianshou;

import static java.util.concurrent.TimeUnit.NANOSECONDS;
import static java.util.stream.LongStream.iterate;
import static java.util.stream.LongStream.rangeClosed;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentLinkedDeque;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.LongSupplier;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.LongStream;
import java.util.stream.Stream;
import org.junit.Test;
import lianshou.support.Rand;
import static lianshou.LowLevelConcurrencyTest.*;

public class ConcurrentProgrammingTest {
	static final int COUNT = 100_000;
  public static boolean isPrime(long n){
    return rangeClosed(2, (long)Math.sqrt(n)).noneMatch(i -> n % i == 0);
  }
  static void timeTest(String id, long checkValue, LongSupplier operation) {
    System.out.print(id + ": ");
    Timer timer = new Timer();
    long result = operation.getAsLong();
    if(result == checkValue)
      System.out.println(timer.duration() + "ms");
    else
      System.out.format("result: %d%ncheckValue: %d%n", result, checkValue);
  }
  public static final int SZ = 100_000_000;
  // This even works:
  //public static final int SZ = 1_000_000_000;
  public static final long CHECK = (long)SZ * ((long)SZ + 1)/2; // Gauss's formula
  static long basicSum(long[] ia) {
    long sum = 0;
    int size = ia.length;
    for(int i = 0; i < size; i++)
      sum += ia[i];
    return sum;
  }
  public static final int SZ2 = 20_000_000;
  public static final long CHECK2 = (long)SZ2 * ((long)SZ2 + 1)/2;
  static long basicSum(Long[] ia) {
    long sum = 0;
    int size = ia.length;
    for(int i = 0; i < size; i++)
      sum += ia[i];
      return sum;
  }
  
  static class IntGenerator implements Supplier<Integer> {
    private int current = 0;
    public Integer get() {
      return current++;
    }
  }
  
  public static final Deque<String> trace = new ConcurrentLinkedDeque<>();

	static class IntGenerator2 implements Supplier<Integer> {
		private AtomicInteger current = new AtomicInteger();
		public Integer get() {
			trace.add(current.get() + ": " + Thread.currentThread().getName());
			return current.getAndIncrement();
		}
	}
	
	static class NapTask implements Runnable {
	  final int id;
	  public NapTask(int id) {
	    this.id = id;
	  }
	  @Override
	  public void run() {
	    new Nap(0.1);// Seconds
	    System.out.println(this + " "+ Thread.currentThread().getName());
	  }
	  @Override
	  public String toString() {
	    return"NapTask[" + id + "]";
	  }
	}
	
	static class InterferingTask implements Runnable {
		final int id;
		private static Integer val = 0;
		public InterferingTask(int id) { this.id = id; }
		@Override
		public void run() {
			for (int i = 0; i < 100; i++)
				val++;
			System.out.println(id + " " + Thread.currentThread().getName() + " " + val);
		}
	}
	
	static class CountingTask implements Callable<Integer> {
	  final int id;
	  public CountingTask(int id) { this.id = id; }
	  @Override
	  public Integer call() {
	    Integer val = 0;
	    for(int i = 0; i < 100; i++)
	      val++;
	    System.out.println(id + " " + Thread.currentThread().getName() + " " + val);
	    return val;
	  }
	  public static Integer extractResult(Future<Integer> f) {
	    try {
	      return f.get();
	    } catch(Exception e) {
	       throw new RuntimeException(e);
	    }
	  }
	}
	
	static class NotRunnable {
	  public void go() {
	    System.out.println("NotRunnable");
	  }
	}
	
	static class NotCallable {
	  public Integer get() {
	    System.out.println("NotCallable");
	    return 1;
	  }
	}
	
	static class QuittableTask implements Runnable {
	  final int id;
	  public QuittableTask(int id) {
	    this.id = id;
	  }
	  private AtomicBoolean running = new AtomicBoolean(true);
	  public void quit() {
	    running.set(false);
	  }
	  @Override
	  public void run() {
	    while(running.get())         // [1] As long as the running flag is true, this task’s run() method will continue.
	      new Nap(0.1);
	    System.out.print(id + " ");  // [2]: The display only happens as the task exits.
	  }
	}
	
	static class Machina {
	  public enum State {
	    START, ONE, TWO, THREE, END;
	    State step() {
	      if(equals(END))
	        return END;
	      return values()[ordinal() + 1];
	    }
	  }
	  private State state = State.START;
	  private final int id;
	  public Machina(int id) {
	    this.id = id;
	  }
	  public static Machina work(Machina m) {
	    if(!m.state.equals(State.END)){
	      new Nap(0.1);
	      m.state = m.state.step();
	    }
	    System.out.println(m);
	    return m;
	  }
	  @Override
	  public String toString() {
	    return "Machina" + id + ": " + (state.equals(State.END)? "complete" : state);
	  }
	}

	public static final int COUNT1 = 150;
	@Test
  public void completableApply() {
    CompletableFuture<Machina> cf = CompletableFuture.completedFuture(new Machina(0));
    CompletableFuture<Machina> cf2 = cf.thenApply(Machina::work);
    CompletableFuture<Machina> cf3 = cf2.thenApply(Machina::work);
    CompletableFuture<Machina> cf4 = cf3.thenApply(Machina::work);
    CompletableFuture<Machina> cf5 = cf4.thenApply(Machina::work);
	}
	@Test
  public void completedMachina() {
		CompletableFuture<Machina> cf = CompletableFuture.completedFuture(new Machina(0));
    try {
      Machina m = cf.get();  // Doesn't block
    }catch(InterruptedException | ExecutionException e) {
      throw new RuntimeException(e);
    }
	}
	@Test
  public void quittingCompletable() {
		List<QuittableTask> tasks =
        IntStream.range(1, COUNT1)
            .mapToObj(QuittableTask::new)
            .collect(Collectors.toList());
    List<CompletableFuture<Void>> cfutures =
        tasks.stream()
            .map(CompletableFuture::runAsync)
            .collect(Collectors.toList());
    new Nap(1);
    tasks.forEach(QuittableTask::quit);
    cfutures.forEach(CompletableFuture::join);
	}
	@Test
  public void quittingTasks() {
		ExecutorService es = Executors.newCachedThreadPool();
		List<QuittableTask> tasks = IntStream.range(1, COUNT1).mapToObj(QuittableTask::new).peek(qt -> es.execute(qt))
				.collect(Collectors.toList());
		new Nap(1);
		tasks.forEach(QuittableTask::quit);
		es.shutdown();
	}
	@Test
  public void lambdasAndMethodReferences2() throws Exception{
		ExecutorService exec = Executors.newCachedThreadPool();
		exec.execute(() -> System.out.println("Lambda1"));
		exec.execute(new NotRunnable()::go);
		Future<Integer> f = exec.submit(() -> {
			System.out.println("Lambda2");
			return 1;
		});
		System.out.println("Lambda2：" + f.get());
		Future<Integer> f2 = exec.submit(new NotCallable()::get);
		System.out.println("MethodReference：" + f2.get());
		exec.shutdown();
	}
	@Test
  public void lambdasAndMethodReferences(){
		ExecutorService exec =
        Executors.newCachedThreadPool();
    exec.submit(() -> System.out.println("Lambda1"));
    exec.submit(new NotRunnable()::go);
    exec.submit(() -> {
        System.out.println("Lambda2");
        return 1;
    });
    exec.submit(new NotCallable()::get);
    exec.shutdown();
	}
	@Test
  public void countingStream(){
		System.out.println(
	      IntStream.range(0, 10)
	        .parallel()
	        .mapToObj(CountingTask::new)
	        .map(ct -> ct.call())
	        .reduce(0, Integer::sum));
	}
	@Test
  public void futures() throws Exception {
    ExecutorService exec = Executors.newSingleThreadExecutor();
    Future<Integer> f = exec.submit(new CountingTask(99));
    System.out.println(f.get());
    exec.shutdown();
	}
	@Test
  public void cachedThreadPool3() throws InterruptedException {
		ExecutorService exec = Executors.newCachedThreadPool();
    List<CountingTask> tasks = IntStream.range(0, 10).mapToObj(CountingTask::new).collect(Collectors.toList());
    List<Future<Integer>> futures = exec.invokeAll(tasks);
    Integer sum = futures.stream().map(CountingTask::extractResult).reduce(0, Integer::sum);
    System.out.println("sum = " + sum);
    exec.shutdown();
	}
	@Test
  public void singleThreadExecutor1() {
		ExecutorService exec=Executors.newSingleThreadExecutor();
    IntStream.range(0, 10)
      .mapToObj(InterferingTask::new)
      .forEach(exec::execute);
    exec.shutdown();
	}
	@Test
  public void cachedThreadPool2() {
		ExecutorService exec =
			Executors.newCachedThreadPool();
		IntStream.range(0, 10)
			.mapToObj(InterferingTask::new)
			.forEach(exec::execute);
		exec.shutdown();
	}
	@Test
  public void cachedThreadPool() {
		ExecutorService exec = Executors.newCachedThreadPool();
    IntStream.range(0, 10)
       .mapToObj(NapTask::new)
       .forEach(exec::execute);
    exec.shutdown();
	}
	@Test
  public void moreTasksAfterShutdown() {
		ExecutorService exec = Executors.newSingleThreadExecutor();
    exec.execute(new NapTask(1));
    exec.shutdown();
    try {
      exec.execute(new NapTask(99));
    } catch (RejectedExecutionException e) {
      System.out.println(e);
    }
	}
	@Test
  public void singleThreadExecutor2() {
		ExecutorService exec = Executors.newSingleThreadExecutor();
    IntStream.range(0, 10)
      .mapToObj(NapTask::new)
      .forEach(exec::execute);
    exec.shutdown();
	}
	@Test
  public void singleThreadExecutor() {
		ExecutorService exec = Executors.newSingleThreadExecutor();
    IntStream.range(0, 10)
      .mapToObj(NapTask::new)
      .forEach(exec::execute);
    System.out.println("All tasks submitted");
    exec.shutdown();
    while(!exec.isTerminated()) {
      System.out.println(Thread.currentThread().getName() + " awaiting termination");
      new Nap(0.1);
    }
	}
	@Test
  public void parallelStreamPuzzle3() {
		List<Integer> x = IntStream.range(0, 30)
	      .peek(e -> System.out.println(e + ": " + Thread.currentThread()
	      .getName()))
	      .limit(10)
	      .parallel()
	      .boxed()
	      .collect(Collectors.toList());
	  System.out.println(x);
	}
  @Test
  public void parallelStreamPuzzle2() throws Exception {
  	List<Integer> x =
  		Stream.generate(new IntGenerator2())
  		.limit(10)
  		.parallel()
  		.collect(Collectors.toList());
  	System.out.println(x);
  	Files.write(Paths.get("src/test/java/lianshou/PSP2.txt"), trace, StandardOpenOption.CREATE);
  }
  @Test
  public void parallelStreamPuzzle() {
    List<Integer> x = Stream.generate(new IntGenerator()).limit(10).parallel()  // [1]
      .collect(Collectors.toList());
    System.out.println(x);
  }
  @Test
  public void collectionIntoStream() {
  	List<String> strings = Stream.generate(new Rand.String(5)).limit(10).collect(Collectors.toList());
    strings.forEach(System.out::println);
    // Convert to a Stream for many more options:
    String result = strings.stream().map(String::toUpperCase).map(s -> s.substring(2)).reduce(":", (s1, s2) -> s1 + s2);
    System.out.println(result);
  }
  @Test
  public void summing4() {
    System.out.println(CHECK);
    Long[] aL = new Long[SZ+1];
    Arrays.parallelSetAll(aL, i -> (long)i);
    timeTest("Long Parallel", CHECK, () -> Arrays.stream(aL).parallel().reduce(0L,Long::sum));
  }
  @Test
  public void summing3() {
    System.out.println(CHECK);
    Long[] aL = new Long[SZ+1];
    Arrays.parallelSetAll(aL, i -> (long)i);
    timeTest("Long Array Stream Reduce", CHECK, () -> Arrays.stream(aL).reduce(0L, Long::sum));
    timeTest("Long Basic Sum", CHECK, () -> basicSum(aL));// Destructive summation:
    timeTest("Long parallelPrefix",CHECK, ()-> {
      Arrays.parallelPrefix(aL, Long::sum);
      return aL[aL.length - 1];
    });
  }
  @Test
  public void summing2() {
  	System.out.println(CHECK2);
    long[] la = new long[SZ2+1];
    Arrays.parallelSetAll(la, i -> i);
    timeTest("Array Stream Sum", CHECK2, () -> Arrays.stream(la).sum());
    timeTest("Parallel", CHECK2, () -> Arrays.stream(la).parallel().sum());
    timeTest("Basic Sum", CHECK2, () -> basicSum(la));// Destructive summation:
    timeTest("parallelPrefix", CHECK2, () -> {
      Arrays.parallelPrefix(la, Long::sum);
      return la[la.length - 1];
    });

  }
  @Test
  public void summing() {
  	System.out.println(CHECK);
    timeTest("Sum Stream", CHECK, () -> LongStream.rangeClosed(0, SZ).sum());
    timeTest("Sum Stream Parallel", CHECK, () -> LongStream.rangeClosed(0, SZ).parallel().sum());
    timeTest("Sum Iterated", CHECK, () -> LongStream.iterate(0, i -> i + 1).limit(SZ+1).sum());
    // Slower & runs out of memory above 1_000_000:
    timeTest("Sum Iterated Parallel", CHECK, () ->
    LongStream.iterate(0, i -> i + 1)
    .parallel()
    .limit(SZ+1).sum());
  }
  @Test
  public void parallelPrime() throws IOException {
    Timer timer = new Timer();
    List<String> primes =
    iterate(2, i -> i + 1)
      .parallel()              // [1]
      .filter(ConcurrentProgrammingTest::isPrime)
      .limit(COUNT)
      .mapToObj(Long::toString)
      .collect(Collectors.toList());
    System.out.println(timer.duration());
    Files.write(Paths.get("src/test/java/lianshou/primes.txt"), primes, StandardOpenOption.CREATE);
  }
  
  //onjava/Timer.java
  //(c)2017 MindView LLC: see Copyright.txt
  //We make no guarantees that this code is fit for any purpose.
  //Visit http:
  //OnJava8.com for more book information.
  static class Timer {
    private long start = System.nanoTime();
    public long duration() {
      return NANOSECONDS.toMillis(
        System.nanoTime() - start);
    }
    public static long duration(Runnable test) {
      Timer timer = new Timer();
      test.run();
      return timer.duration();
    }
  }
  
}
