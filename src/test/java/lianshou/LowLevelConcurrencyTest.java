package lianshou;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Queue;
import java.util.Random;
import java.util.SplittableRandom;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.Delayed;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.PriorityBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.function.IntSupplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import static java.util.concurrent.TimeUnit.*;

import org.junit.Test;

public class LowLevelConcurrencyTest {
	@Test
	public void numberOfProcessors() {
		System.out.println(Runtime.getRuntime().availableProcessors());
	}
	@Test
	public void threadSize() {
		ExecutorService exec = Executors.newCachedThreadPool();
		int count = 0;
		try {
			while (true) {
				exec.execute(new Dummy());
				count++;
			}
		} catch (Error e) {
			System.out.println(e.getClass().getSimpleName() + ": " + count);
			System.exit(0);
		} finally {
			exec.shutdown();
		}
	}
	@Test
	public void workStealingPool() throws InterruptedException {
		System.out.println(Runtime.getRuntime().availableProcessors());
		ExecutorService exec = Executors.newWorkStealingPool();
		IntStream.range(0, 10).mapToObj(n -> new ShowThread()).forEach(exec::execute);
		exec.awaitTermination(1, TimeUnit.SECONDS);
	}
	@Test
	public void swallowedException() throws InterruptedException {
		ExecutorService exec = Executors.newSingleThreadExecutor();
		exec.submit(() -> {
			throw new RuntimeException();
		});
		exec.shutdown();
	}
	@Test
	public void exceptionThread() {
		ExecutorService es = Executors.newCachedThreadPool();
		es.execute(new ExceptionThread());
		es.shutdown();
	}
	@Test
	public void naiveExceptionHandling() {
		ExecutorService es =
	      Executors.newCachedThreadPool();
		try {
			es.execute(new ExceptionThread());
		} catch (RuntimeException ue) {
			// This statement will NOT execute!
			System.out.println("Exception was handled!");
		} finally {
			es.shutdown();
		}	    
	}
	@Test
	public void captureUncaughtException() {
		ExecutorService exec =
	    Executors.newCachedThreadPool(
	      new HandlerThreadFactory());
		exec.execute(new ExceptionThread2());
		exec.shutdown();
	}
	@Test
	public void settingDefaultHandler() {
		Thread.setDefaultUncaughtExceptionHandler(new MyUncaughtExceptionHandler());
    ExecutorService es = Executors.newCachedThreadPool();
    es.execute(new ExceptionThread());
    es.shutdown();
	}
	@Test
	public void abortTest() {
		 new TimedAbort(1);
	    System.out.println("Napping for 4");
	    new Nap(4);
	}
	@Test
	public void evenProducer() {
		EvenChecker.test(new EvenProducer());
	}
	@Test
	public void unSafeReturn() {
		Atomicity.test(new UnsafeReturn());
	}
	@Test
	public void safeReturn() {
		Atomicity.test(new SafeReturn());
	}
	@Test
	public void serialNumber() {
		SerialNumberChecker.test(new SerialNumbers());
	}	
	@Test
	public void synchronizedSerialNumbers() {
		SerialNumberChecker.test(new SynchronizedSerialNumbers());
	}
	@Test
	public void atomicIntegerTest() {
		Atomicity.test(new AtomicIntegerTest());
	}
	@Test
	public void atomicEvenProducer() {
		EvenChecker.test(new AtomicEvenProducer());
	}
	@Test
	public void atomicSerialNumbers() {
		SerialNumberChecker.test(new AtomicSerialNumbers());
	}
	@Test
	public void synchronizedComparison() {
		SynchronizedComparison.test(new CriticalSection());
		SynchronizedComparison.test(new SynchronizedMethod());
	}
	@Test
	public void syncOnObject() {
		SyncOnObject.test(true, false);
    System.out.println("****");
    SyncOnObject.test(false, true);
	}
	@Test
	public void mutexEvenProducer() {
		EvenChecker.test(new MutexEvenProducer());
	}
	@Test
	public void attemptLocking() {
		final AttemptLocking al = new AttemptLocking();
    al.untimed(); // True -- lock is available
    al.timed();   // True -- lock is available
    // Now create a second task to grab the lock:
    CompletableFuture.runAsync( () -> {
        al.lock.lock();
        System.out.println("acquired");
    });
    new Nap(0.1);  // Give the second task a chance
    al.untimed(); // False -- lock grabbed by task
    al.timed();   // False -- lock grabbed by task
	}
	@Test
	public void delayQueueDemo() throws Exception {
		DelayQueue<DelayedTask> tasks = Stream.concat( // Random delays:
				new Random(47).ints(20, 0, 4000).mapToObj(DelayedTask::new),
				// Add the summarizing task:
				Stream.of(new DelayedTask.EndTask(4000))).collect(Collectors.toCollection(DelayQueue::new));
		while (tasks.size() > 0)
			tasks.take().run();
	}
	@Test
	public void priorityBlockingQueueDemo() {
		PriorityBlockingQueue<Prioritized> queue = new PriorityBlockingQueue<>();
		CompletableFuture.runAsync(new Producer(queue));
		CompletableFuture.runAsync(new Producer(queue));
		CompletableFuture.runAsync(new Producer(queue));
		CompletableFuture.runAsync(new Consumer(queue)).join();
	}
	
	static class Dummy extends Thread {
    @Override
    public void run() { new Nap(1); }
  }
	
	public static class Nap {
	  public Nap(double t) { // Seconds
	    try {
	      TimeUnit.MILLISECONDS.sleep((int)(1000 * t));
	    } catch(InterruptedException e) {
	      throw new RuntimeException(e);
	    }
	  }
	  public Nap(double t, String msg) {
	    this(t);
	    System.out.println(msg);
	  }
	}
	static class ShowThread implements Runnable {
	  @Override
	  public void run() {
	    System.out.println(Thread.currentThread().getName());
	  }
	}
	static class ExceptionThread implements Runnable {
	  @Override
	  public void run() {
	    throw new RuntimeException();
	  }
	}
	static class ExceptionThread2 implements Runnable {
	  @Override
	  public void run() {
	    Thread t = Thread.currentThread();
	    System.out.println("run() by " + t.getName());
	    System.out.println(
	      "eh = " + t.getUncaughtExceptionHandler());
	    throw new RuntimeException();
	  }
	}
	static class MyUncaughtExceptionHandler implements Thread.UncaughtExceptionHandler {
	  @Override
	  public void uncaughtException(Thread t, Throwable e) {
	    System.out.println("caught " + e);
	  }
	}
	static class HandlerThreadFactory implements ThreadFactory {
	  @Override
	  public Thread newThread(Runnable r) {
	    System.out.println(this + " creating new Thread");
	    Thread t = new Thread(r);
	    System.out.println("created " + t);
	    t.setUncaughtExceptionHandler(
	      new MyUncaughtExceptionHandler());
	    System.out.println(
	      "eh = " + t.getUncaughtExceptionHandler());
	    return t;
	  }
	}
	static abstract class IntGenerator {
	  private AtomicBoolean canceled =
	    new AtomicBoolean();
	  public abstract int next();
	  public void cancel() { canceled.set(true); }
	  public boolean isCanceled() {
	    return canceled.get();
	  }
	}
	
	static class EvenChecker implements Runnable {
	  private IntGenerator generator;
	  private final int id;
	  public EvenChecker(IntGenerator generator, int id) {
	    this.generator = generator;
	    this.id = id;
	  }
	  @Override
	  public void run() {
	    while(!generator.isCanceled()) {
	      int val = generator.next();
	      if(val % 2 != 0) {
	        System.out.println(val + " not even!");
	        generator.cancel(); // Cancels all EvenCheckers
	      }
	    }
	  }
	  // Test any IntGenerator:
	  public static void test(IntGenerator gp, int count) {
	    List<CompletableFuture<Void>> checkers =
	      IntStream.range(0, count)
	        .mapToObj(i -> new EvenChecker(gp, i))
	        .map(CompletableFuture::runAsync)
	        .collect(Collectors.toList());
	    checkers.forEach(CompletableFuture::join);
	  }
	  // Default value for count:
	  public static void test(IntGenerator gp) {
	    new TimedAbort(4, "No odd numbers discovered");
	    test(gp, 10);
	  }
	}
  
	static class TimedAbort {
	  private volatile boolean restart = true;
	  public TimedAbort(double t, String msg) {
	    CompletableFuture.runAsync(() -> {
	      try {
	        while(restart) {
	          restart = false;
	          TimeUnit.MILLISECONDS
	            .sleep((int)(1000 * t));
	        }
	      } catch(InterruptedException e) {
	        throw new RuntimeException(e);
	      }
	      System.out.println(msg);
	      System.exit(0);
	    });
	  }
	  public TimedAbort(double t) {
	    this(t, "TimedAbort " + t);
	  }
	  public void restart() { restart = true; }
	}
	
	static class EvenProducer extends IntGenerator {
	  private int currentEvenValue = 0;
	  @Override
	  public int next() {
	    ++currentEvenValue; // [1]
	    ++currentEvenValue;
	    return currentEvenValue;
	  }
	}
	
	static class UnsafeReturn extends IntTestable {
	  private int i = 0;
	  public int getAsInt() { return i; }
	  public synchronized void evenIncrement() {
	    i++; i++;
	  }
	}
	
	static abstract class
	IntTestable implements Runnable, IntSupplier {
	  abstract void evenIncrement();
	  @Override
	  public void run() {
	    while(true)
	      evenIncrement();
	  }
	}
	
	static class Atomicity {
	  public static void test(IntTestable it) {
	    new TimedAbort(4, "No failures found");
	    CompletableFuture.runAsync(it);
	    while(true) {
	      int val = it.getAsInt();
	      if(val % 2 != 0) {
	        System.out.println("failed with: " + val);
	        System.exit(0);
	      }
	    }
	  }
	}

	static class SafeReturn extends IntTestable {
	  private int i = 0;
	  public synchronized int getAsInt() { return i; }
	  public synchronized void evenIncrement() {
	    i++; i++;
	  }
	}
	static class SerialNumberChecker implements Runnable {
	  private CircularSet serials = new CircularSet(1000);
	  private SerialNumbers producer;
	  public SerialNumberChecker(SerialNumbers producer) {
	    this.producer = producer;
	  }
	  @Override
	  public void run() {
	    while(true) {
	      int serial = producer.nextSerialNumber();
	      if(serials.contains(serial)) {
	        System.out.println("Duplicate: " + serial);
	        System.exit(0);
	      }
	      serials.add(serial);
	    }
	  }
	  static void test(SerialNumbers producer) {
	    for(int i = 0; i < 10; i++)
	      CompletableFuture.runAsync(
	        new SerialNumberChecker(producer));
	    new Nap(4, "No duplicates detected");
	  }
	}
	static class CircularSet {
	  private int[] array;
	  private int size;
	  private int index = 0;
	  public CircularSet(int size) {
	    this.size = size;
	    array = new int[size];
	    // Initialize to a value not produced
	    // by SerialNumbers:
	    Arrays.fill(array, -1);
	  }
	  public synchronized void add(int i) {
	    array[index] = i;
	    // Wrap index and write over old elements:
	    index = ++index % size;
	  }
	  public synchronized boolean contains(int val) {
	    for(int i = 0; i < size; i++)
	      if(array[i] == val) return true;
	    return false;
	  }
	}
	class SerialNumbers {
	  private volatile int serialNumber = 0;
	  public int nextSerialNumber() {
	    return serialNumber++; // Not thread-safe
	  }
	}
	
	class
	SynchronizedSerialNumbers extends SerialNumbers {
	  private int serialNumber = 0;
	  public synchronized int nextSerialNumber() {
	    return serialNumber++;
	  }
	}
	
	class AtomicIntegerTest extends IntTestable {
	  private AtomicInteger i = new AtomicInteger(0);
	  public int getAsInt() { return i.get(); }
	  public void evenIncrement() { i.addAndGet(2); }
	}
	
	class AtomicEvenProducer extends IntGenerator {
	  private AtomicInteger currentEvenValue =
	    new AtomicInteger(0);
	  @Override
	  public int next() {
	    return currentEvenValue.addAndGet(2);
	  }
	}
	
	class
	AtomicSerialNumbers extends SerialNumbers {
	  private AtomicInteger serialNumber =
	    new AtomicInteger();
	  public synchronized int nextSerialNumber() {
	    return serialNumber.getAndIncrement();
	  }
	}
	
	static class SynchronizedComparison {
	  static void test(Guarded g) {
	    List<CompletableFuture<Void>> callers =
	      Stream.of(
	        new Caller(g),
	        new Caller(g),
	        new Caller(g),
	        new Caller(g))
	        .map(CompletableFuture::runAsync)
	        .collect(Collectors.toList());
	    callers.forEach(CompletableFuture::join);
	    System.out.println(g);
	  }
	}

	abstract class Guarded {
	  AtomicLong callCount = new AtomicLong();
	  public abstract void method();
	  @Override
	  public String toString() {
	    return getClass().getSimpleName() +
	      ": " + callCount.get();
	  }
	}

	class SynchronizedMethod extends Guarded {
	  public synchronized void method() {
	    new Nap(0.01);
	    callCount.incrementAndGet();
	  }
	}

	class CriticalSection extends Guarded {
	  public void method() {
	    new Nap(0.01);
	    synchronized(this) {
	      callCount.incrementAndGet();
	    }
	  }
	}

	static class Caller implements Runnable {
	  private Guarded g;
	  Caller(Guarded g) { this.g = g; }
	  private AtomicLong successfulCalls =
	    new AtomicLong();
	  private AtomicBoolean stop =
	    new AtomicBoolean(false);
	  @Override
	  public void run() {
	    new Timer().schedule(new TimerTask() {
	      public void run() { stop.set(true); }
	    }/*()->stop.set(true)*/, 2500);
	    while(!stop.get()) {
	      g.method();
	      successfulCalls.getAndIncrement();
	    }
	    System.out.println(
	      "-> " + successfulCalls.get());
	  }
	}
	
	static class SyncOnObject {
	  static void test(boolean fNap, boolean gNap) {
	    DualSynch ds = new DualSynch();
	    List<CompletableFuture<Void>> cfs =
	      Arrays.stream(new Runnable[] {
	        () -> ds.f(fNap), () -> ds.g(gNap) })
	        .map(CompletableFuture::runAsync)
	        .collect(Collectors.toList());
	    cfs.forEach(CompletableFuture::join);
	    ds.trace.forEach(System.out::println);
	  }
	}

	static class DualSynch {
	  ConcurrentLinkedQueue<String> trace =
	    new ConcurrentLinkedQueue<>();
	  public synchronized void f(boolean nap) {
	    for(int i = 0; i < 5; i++) {
	      trace.add(String.format("f() " + i));
	      if(nap) new Nap(0.01);
	    }
	  }
	  private Object syncObject = new Object();
	  public void g(boolean nap) {
	    synchronized(syncObject) {
	      for(int i = 0; i < 5; i++) {
	        trace.add(String.format("g() " + i));
	        if(nap) new Nap(0.01);
	      }
	    }
	  }
	}

	class MutexEvenProducer extends IntGenerator {
	  private int currentEvenValue = 0;
	  private Lock lock = new ReentrantLock();
	  @Override
	  public int next() {
	    lock.lock();
	    try {
	      ++currentEvenValue;
	      new Nap(0.01); // Cause failure faster
	      ++currentEvenValue;
	      return currentEvenValue;
	    }finally {
	      lock.unlock();
	    }
	  }
	}
	
	public class AttemptLocking {
	  private ReentrantLock lock = new ReentrantLock();
	  public void untimed() {
	    boolean captured = lock.tryLock();
	    try {
	      System.out.println("tryLock(): " + captured);
	    } finally {
	      if(captured)
	        lock.unlock();
	    }
	  }
	  public void timed() {
	    boolean captured = false;
	    try {
	      captured = lock.tryLock(2, TimeUnit.SECONDS);
	    } catch (InterruptedException e) {
	      throw new RuntimeException(e);
	    }
	    try {
	      System.out.println(
	        "tryLock(2, TimeUnit.SECONDS): " + captured);
	    } finally {
	      if(captured)
	        lock.unlock();
	    }
	  }
	}
	
	static class DelayedTask implements Runnable, Delayed {
	  private static int counter = 0;
	  private final int id = counter++;
	  private final int delta;
	  private final long trigger;
	  protected static List<DelayedTask> sequence =
	    new ArrayList<>();
	  DelayedTask(int delayInMilliseconds) {
	    delta = delayInMilliseconds;
	    trigger = System.nanoTime() +
	      NANOSECONDS.convert(delta, MILLISECONDS);
	    sequence.add(this);
	  }
	  @Override
	  public long getDelay(TimeUnit unit) {
	    return unit.convert(
	      trigger - System.nanoTime(), NANOSECONDS);
	  }
	  @Override
	  public int compareTo(Delayed arg) {
	    DelayedTask that = (DelayedTask)arg;
	    if(trigger < that.trigger) return -1;
	    if(trigger > that.trigger) return 1;
	    return 0;
	  }
	  @Override
	  public void run() {
	    System.out.print(this + " ");
	  }
	  @Override
	  public String toString() {
	    return String.format("[%d] Task %d", delta, id);
	  }
	  public String summary() {
	    return String.format("(%d:%d)", id, delta);
	  }
	  public static class EndTask extends DelayedTask {
	    EndTask(int delay) { super(delay); }
	    @Override
	    public void run() {
	      sequence.forEach(dt-> System.out.println(dt.summary()));
	    }
	  }
	}
	
	static class Prioritized implements Comparable<Prioritized>  {
	  private static AtomicInteger counter = new AtomicInteger();
	  private final int id = counter.getAndIncrement();
	  private final int priority;
	  private static List<Prioritized> sequence = new CopyOnWriteArrayList<>();
	  Prioritized(int priority) {
	    this.priority = priority;
	    sequence.add(this);
	  }
	  @Override
	  public int compareTo(Prioritized arg) {
	    return priority < arg.priority ? 1 : (priority > arg.priority ? -1 : 0);
	  }
	  @Override
	  public String toString() {
	    return String.format("[%d] Prioritized %d", priority, id);
	  }
	  public void displaySequence() {
	    int count = 0;
	    for(Prioritized pt : sequence) {
	      System.out.printf("(%d:%d)", pt.id, pt.priority);
	      if(++count % 5 == 0)
	        System.out.println();
	    }
	  }

	  public static class EndSentinel extends Prioritized {
	    EndSentinel() { super(-1); }
	  }
	}
	
	static class Producer implements Runnable {
	  private static AtomicInteger seed = new AtomicInteger(47);
	  private SplittableRandom rand = new SplittableRandom(seed.getAndAdd(10));
	  private Queue<Prioritized> queue;
	  Producer(Queue<Prioritized> q) {
	    queue = q;
	  }
	  @Override
	  public void run() {
	    rand.ints(10, 0, 20)
	      .mapToObj(Prioritized::new)
	      .peek(p -> new Nap(rand.nextDouble() / 10))
	      .forEach(p -> queue.add(p));
	    queue.add(new Prioritized.EndSentinel());
	  }
	}

	class Consumer implements Runnable {
	  private PriorityBlockingQueue<Prioritized> q;
	  private SplittableRandom rand = new SplittableRandom(47);
	  Consumer(PriorityBlockingQueue<Prioritized> q) {
	    this.q = q;
	  }
	  @Override
	  public void run() {
	    while(true) {
	      try {
	        Prioritized pt = q.take();
	        System.out.println(pt);
	        if(pt instanceof Prioritized.EndSentinel) {
	          pt.displaySequence();
	          break;
	        }
	        new Nap(rand.nextDouble() / 10);
	      } catch(InterruptedException e) {
	        throw new RuntimeException(e);
	      }
	    }
	  }
	}

}


